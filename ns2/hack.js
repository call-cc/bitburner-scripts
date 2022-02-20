export async function main(ns) {
    let target = ns.args[0];

    // var moneyThresh = ns.getServerMaxMoney(target) * 0.50;
    let securityThresh = ns.getServerMinSecurityLevel(target) + 5;

    while (true) {
        //        if (ns.getServerRequiredHackingLevel(target) > getPlayer().hacking) {
        //            ns.print("Server hacking level too high.");
        //            continue;
        //        }

        // let percent = Math.round(ns.getServerMoneyAvailable(target) / ns.getServerMaxMoney(target) * 100);
        // ns.print("Percent money on server: " + percent);
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < (ns.getServerMaxMoney(target) * 0.80)) {
            await ns.grow(target);
        } else {
            // ns.print("Hacking..");
            await ns.hack(target);
        }
    }
}