/** @param {import("/.").NS} ns */
export async function main(ns) {
    const hackScript = '/ns2/smarthack.js';
    const serverList = [
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
        // 'darkweb',
    ];

    for (let i = 0; i < serverList.length; i++) {
        const target = serverList[i];

        if (
            !ns.hasRootAccess(target) ||
            ns.getHackingLevel() < ns.getServerRequiredHackingLevel(target)
        )
            continue;

        if (ns.getServerMaxMoney(target) > 0)
            ns.exec(hackScript, 'home', 1, target);
    }
}
