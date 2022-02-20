/** @param {NS} ns **/
export async function main(ns) {
	let servers = ns.scan();

	let smap = new Map();
	for (let i = 0; i < servers.length; i++) {
		let host = servers[i];

		if (host.startsWith("hive-")) {
			continue;
		}
		smap.set(host, false);
	}

	for (let [k, v] of smap) {
		ns.print(k + ": " + v);
	}

	await ns.sleep(60000);
}