/** @param {NS} ns **/
export async function main(ns) {
    let allowancePercentage = 0.005; // 0.50%

    let hacknetnodes = [];

    ns.disableLog("ALL");

    if (ns.hacknet.numNodes() == 0) {
        ns.hacknet.purchaseNode();
    }

    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
        hacknetnodes.push("hacknet-node-" + i);
    }

    let upgrades = {};

    while (true) {
        for (let i = 0; i < hacknetnodes.length; i++) {
            let gain = [0, 0, 0];

            let currentCash = ns.getServerMoneyAvailable('home');
            currentCash *= allowancePercentage;

            if (ns.hacknet.getPurchaseNodeCost() <= currentCash) {
                let newNodeId = ns.hacknet.purchaseNode();
                hacknetnodes.push("hacknet-node-" + newNodeId);
                ns.print("Purchased new node");
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
                continue;
            }

            if (topgain == gain[0] && ns.hacknet.getLevelUpgradeCost(i, 1) < currentCash) {
                ns.hacknet.upgradeLevel(i, 1);
                upgrades["level"] = true;
            } else if (topgain == gain[1] && ns.hacknet.getRamUpgradeCost(i, 1) < currentCash) {
                ns.hacknet.upgradeRam(i);
                upgrades["ram"] = true;
            } else if (topgain == gain[2] && ns.hacknet.getCoreUpgradeCost(i, 1) < currentCash) {
                ns.hacknet.upgradeCore(i);
                upgrades["core"] = true;
            } else {
                //ns.print('Cannot afford upgrades on Node' + i);
            }
        }

        if (upgrades["level"]) {
            ns.print("Upgraded level");
        }
        if (upgrades["ram"]) {
            ns.print("Upgraded RAM");
        }
        if (upgrades["core"]) {
            ns.print("Upgraded core");
        }

        upgrades = {};
        await ns.sleep(100);
    }
}