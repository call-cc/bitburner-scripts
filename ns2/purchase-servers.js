export async function main(ns) {
    let ram = ns.args[0];
    let i = 0;
    let percent = 0.10;

    while (i < ns.getPurchasedServerLimit()) {
        if ((ns.getServerMoneyAvailable("home") * percent) > ns.getPurchasedServerCost(ram)) {
            ns.purchaseServer("hive-" + i, ram)
            ++i;
        }
        await ns.sleep(5000);
    }
}
