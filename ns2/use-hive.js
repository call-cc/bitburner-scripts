export async function main(ns) {
    let ram = ns.args[0];

    let threads = {
        4: 1,
        8: 3,
        16: 6,
        32: 12,
        64: 24,
        128: 48,
        256: 96,
    }

    let i = 0;
    while (i < ns.getPurchasedServerLimit()) {
        let hostname = "hive-" + i;
        await scp("hack.js", hostname);
        ns.exec("hack.js", hostname, threads[ram]);
        ++i;
    }
}