import { scan } from './ns2/scan.js';

/** @param {import("/.").NS} ns */
export async function main(ns) {
    ns.tail();
    for (let server of scan(ns)) {
        ns.print(server);
    }
    await ns.sleep(1000);
}
