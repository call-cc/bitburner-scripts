export async function main(ns) {
    var target = ns.args[0];
    // var moneyThresh = ns.getServerMaxMoney(target) * 0.50;
    var securityThresh = ns.getServerMinSecurityLevel(target) + 5;

    // TODO: hack server if we don't have root

    ns.nuke(target);
    while (true) {
        //        if (ns.getServerRequiredHackingLevel(target) > getPlayer().hacking) {
        //            ns.print("Server hacking level too high.");
        //            continue;
        //        }

        // let percent = Math.round(ns.getServerMoneyAvailable(target) / ns.getServerMaxMoney(target) * 100);
        // ns.print("Percent money on server: " + percent);
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < 100000 ) {
            await ns.grow(target);
        } else {
            // ns.print("Hacking..");
            await ns.hack(target);
        }
    }
}
