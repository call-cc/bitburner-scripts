/** @param {import("/.").NS} ns */
export function scan(ns) {
    ns.disableLog('ALL');
    const sList = new Set();

    function recursiveScan(servers) {
        for (let i = 0; i < servers.length; i++) {
            let host = servers[i];

            if (host.startsWith('hive-')) {
                continue;
            }

            if (sList.has(host)) {
                continue;
            }

            sList.add(host);
            recursiveScan(ns.scan(host));
        }

        return sList;
    }

    return recursiveScan(['home']);

    /*
    for (const host of sList.keys()) {
        await ns.write('servers.txt', `${host}\n`, 'a');
    }
    */
}
