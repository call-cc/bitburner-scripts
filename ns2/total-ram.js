import { scan } from './ns2/scan.js';

/** @param {import("/.").NS} ns */
export async function main(ns) {
    let totalRam = 0;
    for (let server of scan(ns, true, true)) {
        const so = ns.getServer(server);
        totalRam += so.maxRam;
    }
    const str = ns.nFormat(totalRam * 1e9, '0.0a');
    ns.tprint(`Total RAM: ${str}`);
}
