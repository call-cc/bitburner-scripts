/** @param {import("/.").NS} ns */
export async function main(ns) {
    ns.tail();
    for (let srv of ns.getPurchasedServers()) {
        ns.print(srv);
    }
}
