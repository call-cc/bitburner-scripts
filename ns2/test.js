/** @param {NS} ns **/
export async function main(ns) {
	let target = "foodnstuff";
	let runServer = "hive-24";

	let secLevel = 5;

	while (true) {
		if (ns.getServerSecurityLevel(target) > (ns.getServerMinSecurityLevel(target) + secLevel)) {
			while (ns.ps(runServer).length > 0) {
				await ns.sleep(1000);
			}
			let procs = ns.ps(runServer);
			ns.exec("0weaken.js", runServer, 3, target);

		} else if (ns.getServerMoneyAvailable(target) < (ns.getServerMaxMoney(target) * 0.80)) {
			while (ns.ps(runServer).length > 0) {
				await ns.sleep(1000);
			};
			ns.exec("0grow.js", runServer, 3, target);
		} else {
			while (ns.ps(runServer).length > 0) {
				await ns.sleep(1000);
			}
			ns.exec("0hack.js", runServer, 3, target);
		}

		await ns.sleep(2000);
	}
}