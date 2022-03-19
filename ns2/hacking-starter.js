import { scan } from './ns2/scan.js';

/** @param {import("/.").NS} ns */
export async function main(ns) {
    while (true) {
        let servers = scan(ns).filter(
            (s) =>
                ns.hasRootAccess(s) &&
                ns.getServerMaxMoney(s) > 0 &&
                !ns.getServer(s).purchasedByPlayer
        );
        const player = ns.getPlayer();
        for (let server of servers) {
            const so = ns.getServer(server);
            if (so.requiredHackingSkill < player.hacking / 2) {
                if (isRunning(ns, server)) continue;
                ns.exec('starter.js', 'home', 1, server);
                ns.print(`Starting hacking ${server}`);
            }
        }
        await ns.sleep(10 * 1000);
    }
}

function isRunning(ns, server) {
    for (let proc of ns.ps('home')) {
        if (proc.filename == 'starter.js' && proc.args[0] == server)
            return true;
    }

    return false;
}
