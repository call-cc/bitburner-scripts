import { scan } from './ns2/scan.js';

/** @param {import("/.").NS} ns */
export async function main(ns) {
    const hackPrgs = [
        'BruteSSH.exe',
        'FTPCrack.exe',
        'relaySMTP.exe',
        'HTTPWorm.exe',
        'SQLInject.exe',
    ];

    ns.disableLog('ALL');

    while (true) {
        let canOpen = 0;
        for (let i = 0; i < hackPrgs.length; i++) {
            if (ns.fileExists(hackPrgs[i])) {
                canOpen++;
            }
        }

        for (let server of scan(ns)) {
            if (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(server))
                continue;

            if (canOpen < ns.getServerNumPortsRequired(server)) continue;

            if (ns.fileExists('BruteSSH.exe')) {
                ns.brutessh(server);
            }
            if (ns.fileExists('FTPCrack.exe')) {
                ns.ftpcrack(server);
            }
            if (ns.fileExists('relaySMTP.exe')) {
                ns.relaysmtp(server);
            }
            if (ns.fileExists('HTTPWorm.exe')) {
                ns.httpworm(server);
            }
            if (ns.fileExists('SQLInject.exe')) {
                ns.sqlinject(server);
            }

            if (!ns.hasRootAccess(server)) {
                ns.nuke(server);
                ns.print('Nuked ' + server);
            }
        }

        await ns.sleep(60000);
    }
}
