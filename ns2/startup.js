export async function main(ns) {
    let serverList = [
        "CSEC",
        "sigma-cosmetics",
        "joesguns",
        "nectar-net",
        "hong-fang-tea",
        "harakiri-sushi",
        "foodnstuff",
        "neo-net",
        "zer0",
        "max-hardware",
        "iron-gym",
        "phantasy",
        "omega-net",
        "netlink",
        "rothman-uni",
        "silver-helix",
        "summit-uni",
        "avmnite-02h",
        "catalyst",
        "I.I.I.I",
        "the-hub",
    ];

    let hackFile = "hack.js";

    let threads = {
        8: 3,
        16: 6,
        32: 12,
        64: 24,
        128: 48,
        256: 96,
    }

    for (let i = 0; i < serverList.length; ++i) {
        let server = serverList[i];

        let ports = ns.getServerNumPortsRequired(server);

        if (ports > 3) {
            continue;
        }

        if (ports > 2) {
            await waitApp(ns, "relaySMTP.exe");
            ns.relaysmtp(server);
        }

        if (ports > 1) {
            await waitApp(ns, "FTPCrack.exe");
            ns.ftpcrack(server);
        }

        if (ports > 0) {
            await waitApp(ns, "BruteSSH.exe");
            ns.brutessh(server);
        }

        let t = threads[ns.getServerRam(server)[0]];

        await ns.scp(hackFile, server);

        // if (!ns.hasRootAccess(server)) {
        ns.nuke(server);
        //}

        ns.exec(hackFile, server, t, server);
    }
}

async function waitApp(ns, prg) {
    while (!ns.fileExists(prg)) {
        await ns.sleep(60000);
    }
}
