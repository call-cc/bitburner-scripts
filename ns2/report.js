import { scan } from './ns2/scan.js';

function formatDuration(ms) {
    const date = new Date(null);
    date.setSeconds(ms / 1000);
    return date.toISOString().substring(11, 19);
}

function pad(text, width) {
    return text.padStart(width, ' ');
}

/** @param {import("/.").NS} ns */
export async function main(ns) {
    ns.tail();
    while (true) {
        ns.clearLog();
        for (const hostname of scan(ns).keys()) {
            if (ns.getServerMaxMoney(hostname) == 0) continue;
            if (
                ns.getServerRequiredHackingLevel(hostname) >
                ns.getHackingLevel()
            )
                continue;
            let line = `${pad(hostname, 22)} │ `;
            line += `${pad(
                ns.getServerMaxMoney(hostname).toLocaleString(),
                18
            )} │ `;
            line += `${pad(
                Math.floor(
                    ns.getServerMoneyAvailable(hostname)
                ).toLocaleString(),
                22
            )} │`;
            line += `${pad(formatDuration(ns.getHackTime(hostname)), 10)} │ `;
            line += `${pad(
                ns.getServerRequiredHackingLevel(hostname).toString(),
                6
            )}`;
            ns.print(line);
        }
        await ns.sleep(5000);
    }
}
