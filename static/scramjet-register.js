async function registerScramjet() {
    if (!window.isSecureContext && !["localhost", "127.0.0.1"].includes(location.hostname)) {
        throw new Error("Scramjet requires HTTPS or localhost.");
    }

    if (!("serviceWorker" in navigator)) {
        throw new Error("This browser does not support service workers.");
    }

    await navigator.serviceWorker.register("/static/scramjet-sw.js");
    await navigator.serviceWorker.ready;
}
