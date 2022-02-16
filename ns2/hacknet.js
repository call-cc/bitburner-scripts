/** @param {NS} ns **/
export async function main(ns) {
    let allowancePercentage = 0.01;
    let hacknetnodes = [];

    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
        hacknetnodes.push("hacknet-node-" + i);
    }

    while (true) {
        for (let i = 0; i < hacknetnodes.length; i++) {
            let gain = [0, 0, 0];

            let currentCash = ns.getServerMoneyAvailable('home');
            currentCash *= allowancePercentage;

            if (ns.hacknet.getPurchaseNodeCost() <= currentCash) {
                ns.hacknet.purchaseNode();
            }

            let node = ns.hacknet.getNodeStats(i);

            if (node.level < 200) {
                gain[0] = ((node.level + 1) * 1.6) * Math.pow(1.035, (node.ram - 1)) * ((node.cores + 5) / 6) / ns.hacknet.getLevelUpgradeCost(i, 1);
            } else {
                gain[0] = 0;
            }

            if (node.ram < 64) {
                gain[1] = (node.level * 1.6) * Math.pow(1.035, (node.ram * 2) - 1) * ((node.cores + 5) / 6) / ns.hacknet.getRamUpgradeCost(i);
            } else {
                gain[1] = 0;
            }

            if (node.cores < 16) {
                gain[2] = (node.level * 1.6) * Math.pow(1.035, node.ram - 1) * ((node.cores + 6) / 6) / ns.hacknet.getCoreUpgradeCost(i);
            } else {
                gain[2] = 0;
            }

            let topgain = 0;
            topgain = Math.max(...gain);

            if (topgain === 0) {
                ns.print('All Gains maxed on Node' + i);
                break;
            }

            if (topgain == gain[0] && ns.hacknet.getLevelUpgradeCost(i, 1) < currentCash) {
                ns.print('Upgrading Level on Node' + i);
                ns.hacknet.upgradeLevel(i, 1);
            } else if (topgain == gain[1] && ns.hacknet.getRamUpgradeCost(i, 1) < currentCash) {
                ns.print('Upgrading Ram on Node' + i);
                ns.hacknet.upgradeRam(i);
            } else if (topgain == gain[2] && ns.hacknet.getCoreUpgradeCost(i, 1) < currentCash) {
                ns.print('Upgrading Core on Node' + i);
                ns.hacknet.upgradeCore(i);
            } else {
                ns.print('Cannot afford upgrades on Node' + i);
            }
        }

        await ns.sleep(1000);
    }
}
