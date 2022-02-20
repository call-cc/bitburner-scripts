export async function main(ns) {
    let target = "the-hub";

    let hackFile = "/ns2/hack.js";

    let i = 0;
    while(i < ns.getPurchasedServerLimit()) {
        let host = "hive-" + i;
        await ns.scp(hackFile, host);
        await ns.exec(hackFile, host, 6, target);
        ++i;
    }
}
