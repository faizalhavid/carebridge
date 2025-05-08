export function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const browser = getBrowserInfo(userAgent);
    const os = getOSInfo(userAgent);

    return {
        deviceType: /Mobi|Android/i.test(userAgent) ? "Mobile" : "Desktop",
        operatingSystem: os.name,
        osVersion: os.version,
        browser: browser.name,
        browserVersion: browser.version,
        deviceToken: "", // You can populate this with a push notification token if needed
        ipAddress: "", // IP address can be collected on the server side
    };
}

function getBrowserInfo(userAgent: string) {
    if (/chrome|crios|crmo/i.test(userAgent)) {
        return { name: "Chrome", version: getVersion(userAgent, /(?:chrome|crios|crmo)\/(\d+)/i) };
    } else if (/firefox|fxios/i.test(userAgent)) {
        return { name: "Firefox", version: getVersion(userAgent, /(?:firefox|fxios)\/(\d+)/i) };
    } else if (/safari/i.test(userAgent) && !/chrome|crios|crmo/i.test(userAgent)) {
        return { name: "Safari", version: getVersion(userAgent, /version\/(\d+)/i) };
    } else if (/msie|trident/i.test(userAgent)) {
        return { name: "Internet Explorer", version: getVersion(userAgent, /(?:msie |rv:)(\d+)/i) };
    }
    return { name: "Unknown", version: "Unknown" };
}

function getOSInfo(userAgent: string) {
    if (/windows nt/i.test(userAgent)) {
        return { name: "Windows", version: getVersion(userAgent, /windows nt (\d+\.\d+)/i) };
    } else if (/mac os x/i.test(userAgent)) {
        return { name: "Mac OS", version: getVersion(userAgent, /mac os x (\d+_\d+)/i).replace("_", ".") };
    } else if (/android/i.test(userAgent)) {
        return { name: "Android", version: getVersion(userAgent, /android (\d+)/i) };
    } else if (/iphone|ipad|ipod/i.test(userAgent)) {
        return { name: "iOS", version: getVersion(userAgent, /os (\d+_\d+)/i).replace("_", ".") };
    }
    return { name: "Unknown", version: "Unknown" };
}

function getVersion(userAgent: string, regex: RegExp) {
    const match = userAgent.match(regex);
    return match ? match[1] : "Unknown";
}