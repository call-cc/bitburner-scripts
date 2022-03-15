export async function main(ns) {
    let ram = ns.args[0];

    if (ram == 0) {
        // playerMoney >= 55e3 * 2 ** x
    }

    const nextIdx = ns.getPurchasedServers().length + 1;
    ns.purchaseServer(`ecto-${nextIdx}`, ram);

    await ns.sleep(1);
}
