/** @param {import("/.").NS} ns */
export async function main(ns) {
    const targets = [
        'CSEC',
        'I.I.I.I',
        'avmnite-02h',
        'run4theh111z',
        'fulcrumassets',
    ];

    for (let i = 0; i < targets.length; i++) {
        const host = ns.getServer(targets[i]);
        const name = host.hostname;
        if (host.hasAdminRights) {
            ns.tprint('Backdooring ' + name);
            ns.connect(name);
            await ns.installBackdoor();
        }
    }
}
