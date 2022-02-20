export async function main(ns) {
    let serverList = [
        "n00dles",
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
        "the-hub",
        "aevum-police",
        "rho-construction",
        "millenium-fitness",
        "alpha-ent",
        "unitalife",
        "zb-institute",
        "lexo-corp",
        "solaris",
        "global-pharm",
        "omnia",
        "univ-energy",
        "darkweb",
        "I.I.I.I",
        "comptek",
        "johnson-ortho",
        "snap-fitness",
        "syscore",
        "zb-def",
        "nova-med",
        "zeus-med",
        "galactic-cyber",
        "infocomm",
        "aerocorp",
        "taiyang-digital",
        "deltaone",
        "icarus",
        "defcomm",
        "crush-fitness",
    ];

    let hackFile = "/ns2/hack.js";

    let hackPrgs = [
        "BruteSSH.exe",
        "FTPCrack.exe",
        "relaySMTP.exe",
        "HTTPWorm.exe",
        "SQLInject.exe"];

    ns.disableLog("ALL");

    let threads = {
        0: 0,
        1: 0,
        4: 1,
        8: 3,
        16: 6,
        32: 12,
        64: 24,
        128: 48,
        256: 96,
    }

    while (true) {
        let canOpen = 0;
        for (let i = 0; i < hackPrgs.length; i++) {
            if (ns.fileExists(hackPrgs[i])) {
                canOpen++;
            }
        }

        for (let i = 0; i < serverList.length; i++) {
            let server = serverList[i];

            if (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(server)) {
                continue;
            }

            if (canOpen < ns.getServerNumPortsRequired(server)) {
                continue;
            }

            if (ns.fileExists("BruteSSH.exe")) {
                ns.brutessh(server);
            }
            if (ns.fileExists("FTPCrack.exe")) {
                ns.ftpcrack(server);
            }
            if (ns.fileExists("relaySMTP.exe")) {
                ns.relaysmtp(server);
            }
            if (ns.fileExists("HTTPWorm.exe")) {
                ns.httpworm(server);
            }
            if (ns.fileExists("SQLInject.exe")) {
                ns.sqlinject(server);
            }

            let serverRam = ns.getServerMaxRam(server);
            let t = threads[serverRam];

            await ns.scp(hackFile, server);

            if (!ns.hasRootAccess(server)) {
                ns.nuke(server);
                ns.print("Nuked " + server);
            }

            if(serverRam >= 4) {
                ns.exec(hackFile, server, t, server);
            } else {
                ns.exec(hackFile, "home", 24, server);
            }
        }

        await ns.sleep(60000);
    }
}