import { scan } from './ns2/scan.js';

/** @param {import("/.").NS} ns */
export async function main(ns) {
    ns.clearLog();
    ns.tail();
    for (let server of [...scan(ns)]) {
        for (let proc of ns.ps(server)) {
            ns.print(proc);
        }
    }
}
