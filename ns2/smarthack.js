/** @param {import("/.").NS} ns */
export async function main(ns) {
    const plusSecLvl = 5;
    const moneyPercent = 0.8;

    const hackScript = '/ns2/1hack.js';
    const growScript = '/ns2/1grow.js';
    const weakenScript = '/ns2/1weaken.js';

    const target = ns.args[0];
    const runner = ns.args[1] || 'home';

    ns.disableLog('ALL');

    const hackRam = ns.getScriptRam(hackScript);
    const growRam = ns.getScriptRam(growScript);
    const weakenRam = ns.getScriptRam(weakenScript);

    while (true) {
        const homeMaxRam = ns.getServerMaxRam(runner);
        const hackTime = ns.getHackTime(target);
        const growTime = ns.getGrowTime(target);
        const weakenTime = ns.getWeakenTime(target);

        const minSec = ns.getServerMinSecurityLevel(target);
        const sec = ns.getServerSecurityLevel(target);
        let weakenThreads = Math.ceil((sec - minSec) / ns.weakenAnalyze(1));

        let money = ns.getServerMoneyAvailable(target);
        if (money <= 0) money = 1; // division by zero safety
        let hackThreads = Math.ceil(ns.hackAnalyzeThreads(target, money));

        const maxMoney = ns.getServerMaxMoney(target);
        let growThreads = Math.ceil(
            ns.growthAnalyze(target, Math.max(1, maxMoney / money))
        );

        const homeUsedRam = ns.getServerUsedRam(runner);
        const availableRam = homeMaxRam - homeUsedRam;
        const maxThreads = Math.floor(
            availableRam / Math.max(hackRam, growRam, weakenRam)
        );

        const securityThresh = minSec + plusSecLvl;
        const moneyThresh = maxMoney * moneyPercent;

        if (ns.getServerSecurityLevel(target) > securityThresh) {
            // If the server's security level is above our threshold, weaken it
            weakenThreads = Math.max(1, Math.min(maxThreads, weakenThreads));
            ns.exec(weakenScript, runner, weakenThreads, target);
            logScript('Weakening', target, weakenThreads, weakenTime);
            await ns.sleep(weakenTime);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            // If the server's money is less than our threshold, grow it
            growThreads = Math.max(1, Math.min(maxThreads, growThreads));
            ns.exec(growScript, runner, growThreads, target);
            logScript('Growing', target, growThreads, growTime);
            await ns.sleep(growTime);
        } else {
            // Otherwise, hack it
            hackThreads = Math.max(1, Math.min(maxThreads, hackThreads));
            ns.exec(hackScript, runner, hackThreads, target);
            logScript('Hacking', target, hackThreads, hackTime, money);
            await ns.sleep(hackTime);
        }
    }

    function logScript(action, targetHost, threads, time, money = 0) {
        let logStr = `${action} ${targetHost} with ${threads} threads for ${formatDuration(
            time
        )}`;
        if (money > 0) logStr += ` for $${money.toLocaleString()}`;

        logger(logStr);
    }

    function logger(str) {
        const ts = getTime();
        ns.print(`${ts} ${str}`);
    }

    function formatDuration(ms) {
        const date = new Date(null);
        date.setSeconds(ms / 1000);
        return date.toISOString().substring(11, 19);
    }

    function getTime() {
        const time = new Date();
        const h = padNum(time.getHours(), 2);
        const m = padNum(time.getMinutes(), 2);
        const s = padNum(time.getSeconds(), 2);

        return `[${h}:${m}:${s}]`;
    }

    function padNum(n, width) {
        return n.toString().padStart(width, 0);
    }
}
