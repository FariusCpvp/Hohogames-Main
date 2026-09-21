"use strict";
const stockSW = "/static/uv-sw.js";
const swAllowedHostnames = ["localhost", "127.0.0.1"];
async function registerSW() {
  if (location.protocol !== "https:" && !swAllowedHostnames.includes(location.hostname)) {
    throw new Error("Service workers require HTTPS (or localhost in development).");
  }
  if (!navigator.serviceWorker) throw new Error("This browser does not support service workers.");
  await navigator.serviceWorker.register(stockSW, { scope: __uv$config.prefix });
  await navigator.serviceWorker.ready;
}
