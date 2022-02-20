/** @param {NS} ns **/
export async function main(ns) {
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
    }

    recursiveScan(['home']);
    sList.delete('home');

    let count = 0;
    for (const host of sList.keys()) {
        ns.print(`"${host}",`);
        count++;
    }

    ns.print('Total number of servers: ' + count);
}
