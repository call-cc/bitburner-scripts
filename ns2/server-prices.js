/** @param {NS} ns **/
export async function main(ns) {
    const baseCost = ns.getPurchasedServerCost(1);

    ns.tail();
    for (let i = 0; i < 20; i++) {
        const cost = ns.nFormat(baseCost * 2 ** i, '0.0a').padStart(10);
        const ram = `${2 ** i}G`.padStart(10);
        ns.print(`${ram} ${cost}`);
    }

    const money = ns.getPlayer().money;
    const ram = Math.floor(Math.log(money / baseCost) / Math.log(2));
    ns.print('');
    await ns.print(`The largest server you can buy: ${2 ** ram} GB.`);
}
