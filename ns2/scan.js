/** @param {import("/.").NS} ns */
export function scan(ns) {
    ns.disableLog('ALL');
    const sList = new Set();

    function recursiveScan(servers) {
        for (let server of servers) {
            if (ns.getServer(server).purchasedByPlayer && server != 'home')
                continue;

            if (sList.has(server)) continue;

            sList.add(server);
            recursiveScan(ns.scan(server));
        }

        return sList;
    }

    return Array(...recursiveScan(['home']));
}
