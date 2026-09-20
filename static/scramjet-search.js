"use strict";

const scramjetForm = document.getElementById("uv-form");
const scramjetAddress = document.getElementById("uv-address");
const scramjetSearchEngine = document.getElementById("uv-search-engine");
const scramjetError = document.getElementById("uv-error");
const scramjetErrorCode = document.getElementById("uv-error-code");

const { ScramjetController } = $scramjetLoadController();
const scramjet = new ScramjetController(window.scramjetConfig);
const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

async function scramjetSearch(input, template) {
    try {
        return new URL(input).toString();
    } catch {
        const withProtocol = new URL(`http://${input}`);
        if (withProtocol.hostname.includes(".")) return withProtocol.toString();
    }

    return template.replace("%s", encodeURIComponent(input));
}

scramjet.init();

scramjetForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    scramjetError.textContent = "";
    scramjetErrorCode.textContent = "";

    try {
        await registerScramjet();
        const url = await scramjetSearch(scramjetAddress.value.trim(), scramjetSearchEngine.value);
        const wispUrl = `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/wisp/`;

        if ((await connection.getTransport()) !== "/libcurl/index.mjs") {
            await connection.setTransport("/libcurl/index.mjs", [{ websocket: wispUrl }]);
        }

        const frame = scramjet.createFrame();
        frame.frame.className = "scramjet-frame";
        document.body.appendChild(frame.frame);
        frame.go(url);
    } catch (error) {
        scramjetError.textContent = "The browser could not open that address.";
        scramjetErrorCode.textContent = error instanceof Error ? error.message : String(error);
    }
});
