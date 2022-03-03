/** @param {NS} ns **/
export async function main(ns) {
    const baseCost = 55000;
    ns.tail();
    for (let i = 0; i < 22; i++) {
        const cost = ns.nFormat(baseCost * 2 ** i, '0.0a').padStart(10);
        const ram = `${2 ** i}G`.padStart(10);
        ns.print(`${cost} ${ram}`);
    }
    await ns.sleep(1);
}
