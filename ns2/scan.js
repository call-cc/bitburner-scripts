/** @param {import("/.").NS} ns */
export function scan(ns, pservers = false, home = false) {
    ns.disableLog('ALL');
    const sList = new Set();

    function recursiveScan(servers) {
        for (let server of servers) {
            if (
                ns.getServer(server).purchasedByPlayer &&
                server != 'home' &&
                !pservers
            )
                continue;

            if (sList.has(server)) continue;

            sList.add(server);
            recursiveScan(ns.scan(server));
        }

        if (!home) sList.delete('home');
        return sList;
    }

    return Array(...recursiveScan(['home']));
}
