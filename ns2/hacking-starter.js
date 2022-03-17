import { scan } from './ns2/scan.js';

/** @param {import("/.").NS} ns */
export async function main(ns) {
    while (true) {
        const servers = scan(ns);
        const player = ns.getPlayer();
        for (let server of servers) {
            const so = ns.getServer(server);
            if (so.purchasedByPlayer) continue;
            if (so.moneyMax == 0) continue;
            if (!so.hasAdminRights) continue;
            if (so.requiredHackingSkill < player.hacking / 2) {
                if (isRunning(ns, server)) continue;
                ns.exec('starter.js', 'home', 1, server);
                ns.print(`Starting hacking ${server}`);
            }
        }
        await ns.sleep(60 * 1000);
    }
}

function isRunning(ns, server) {
    for (let proc of ns.ps('home')) {
        if (proc.args[0] == server) return true;
    }

    return false;
}
