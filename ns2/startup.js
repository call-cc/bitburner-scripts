/** @param {import("/.").NS} ns */
export async function main(ns) {
    let serverList = [
        'n00dles',
        'foodnstuff',
        'sigma-cosmetics',
        'joesguns',
        'hong-fang-tea',
        'harakiri-sushi',
        'nectar-net',
        'phantasy',
        'johnson-ortho',
        'rothman-uni',
        'avmnite-02h',
        'catalyst',
        'lexo-corp',
        'global-pharm',
        'max-hardware',
        'neo-net',
        'the-hub',
        'zb-institute',
        'aevum-police',
        'comptek',
        'syscore',
        'netlink',
        'summit-uni',
        'rho-construction',
        'millenium-fitness',
        'galactic-cyber',
        'aerocorp',
        'omnia',
        'univ-energy',
        'taiyang-digital',
        'zeus-med',
        'nova-med',
        'titan-labs',
        'stormtech',
        'vitalife',
        'omnitek',
        'b-and-a',
        'megacorp',
        'nwo',
        'The-Cave',
        '4sigma',
        'blade',
        'fulcrumassets',
        'powerhouse-fitness',
        'ecorp',
        '.',
        'microdyne',
        'fulcrumtech',
        'applied-energetics',
        'deltaone',
        'icarus',
        'solaris',
        'unitalife',
        'defcomm',
        'infocomm',
        'run4theh111z',
        'helios',
        'kuai-gong',
        'clarkinc',
        'zb-def',
        'I.I.I.I',
        'alpha-ent',
        'snap-fitness',
        'iron-gym',
        'zer0',
        'CSEC',
        'silver-helix',
        'crush-fitness',
        'omega-net',
        'darkweb',
    ];

    let hackFile = '/ns2/hack.js';

    let hackPrgs = [
        'BruteSSH.exe',
        'FTPCrack.exe',
        'relaySMTP.exe',
        'HTTPWorm.exe',
        'SQLInject.exe',
    ];

    ns.disableLog('ALL');

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
    };

    while (true) {
        let canOpen = 0;
        for (let i = 0; i < hackPrgs.length; i++) {
            if (ns.fileExists(hackPrgs[i])) {
                canOpen++;
            }
        }

        for (let i = 0; i < serverList.length; i++) {
            let server = serverList[i];

            if (
                ns.getHackingLevel() < ns.getServerRequiredHackingLevel(server)
            ) {
                continue;
            }

            if (canOpen < ns.getServerNumPortsRequired(server)) {
                continue;
            }

            if (ns.fileExists('BruteSSH.exe')) {
                ns.brutessh(server);
            }
            if (ns.fileExists('FTPCrack.exe')) {
                ns.ftpcrack(server);
            }
            if (ns.fileExists('relaySMTP.exe')) {
                ns.relaysmtp(server);
            }
            if (ns.fileExists('HTTPWorm.exe')) {
                ns.httpworm(server);
            }
            if (ns.fileExists('SQLInject.exe')) {
                ns.sqlinject(server);
            }

            if (ns.getServerMaxMoney(server) < 1) {
                continue;
            }

            let serverRam = ns.getServerMaxRam(server);
            let t = threads[serverRam];

            await ns.scp(hackFile, server);

            if (!ns.hasRootAccess(server)) {
                ns.nuke(server);
                ns.print('Nuked ' + server);
            }

            if (serverRam >= 4) {
                ns.exec(hackFile, server, t, server);
            } else {
                ns.exec(hackFile, 'home', 24, server);
            }
        }

        await ns.sleep(60000);
    }
}
