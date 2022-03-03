import { scan } from './ns2/scan.js';

const urlPrefix = 'http://10.0.0.10:5252/bitburner';
const secret = 'passwordhere';
const loopDelay = 5;

let grafanaLogs = {};

function getScriptProcs(ns) {
    const metrics = {
        p: 0,
        h: 0,
        g: 0,
        w: 0,
        ht: 0,
        gt: 0,
        wt: 0,
    };

    for (let server of ['home', ...ns.getPurchasedServers(), ...scan(ns)]) {
        for (let proc of ns.ps(server)) {
            if (proc.filename == 'hack-once.js') {
                metrics['h']++;
                metrics['ht'] += proc.threads;
            }
            if (proc.filename == 'grow-once.js') {
                metrics['g']++;
                metrics['gt'] += proc.threads;
            }
            if (proc.filename == 'weaken-once.js') {
                metrics['w']++;
                metrics['wt'] += proc.threads;
            }
            metrics['p']++;
        }
    }

    return metrics;
}

/** @param {import("/.").NS} ns */
export async function main(ns) {
    while (true) {
        const metrics = getScriptProcs(ns);

        const eGrafana = {
            '/money': {
                money: ns.getPlayer().money,
            },
            '/': {
                processes: metrics['p'],
                hacking: metrics['h'],
                growing: metrics['g'],
                weakening: metrics['w'],
                hacking_threads: metrics['ht'],
                growing_threads: metrics['gt'],
                weakening_threads: metrics['wt'],
            },
            '/servers': {
                known: 0,
                rooted: 0,
                owned: ns.getPurchasedServers().length,
                profitable: 0,
            },
        };

        for (const k of Object.keys(eGrafana)) {
            grafanaLogs[k] = eGrafana[k];
        }

        for (const [endpoint, data] of Object.entries(grafanaLogs)) {
            data.secret = secret;
            let urlString = `${urlPrefix}${endpoint}?${Object.entries(data)
                .map((e) => `${e[0]}=${e[1]}`)
                .join('&')}`;
            let resp = await ns.wget(urlString, '_.txt');

            if (!resp) {
                continue;
            }

            let respCode = await ns.read('_.txt');
            if (respCode[0] === '4' || respCode[0] === '5') {
                continue;
            }

            delete grafanaLogs[endpoint];
        }
        await ns.sleep(loopDelay * 1000);
    }
}
