"use strict";

const form = document.getElementById("browser-form");
const heroForm = document.getElementById("hero-form");
const address = document.getElementById("address");
const heroAddress = document.getElementById("hero-address");
const homeView = document.getElementById("home-view");
const browserView = document.getElementById("browser-view");
const frame = document.getElementById("proxy-frame");
const loading = document.getElementById("loading");
const progress = document.getElementById("progress");
const status = document.getElementById("status");
const errorBox = document.getElementById("frame-error");
const retry = document.getElementById("retry");
const back = document.getElementById("back");
const forward = document.getElementById("forward");
const reload = document.getElementById("reload");
const home = document.getElementById("home");

const ENGINE = "https://www.google.com/search?q=%s";
let currentTarget = "";
let loadTimer = null;

function setProgress(value) { progress.style.width = `${value}%`; }
function showHome() {
  homeView.hidden = false;
  browserView.hidden = true;
  frame.src = "about:blank";
  currentTarget = "";
  address.value = "";
  status.textContent = "Ready";
  setProgress(0);
}
function showBrowser() {
  homeView.hidden = true;
  browserView.hidden = false;
}
async function ensureProxy() {
  if (typeof registerSW !== "function") throw new Error("Proxy service worker is unavailable.");
  await registerSW();
}
function encodedProxyUrl(target) {
  if (!window.__uv$config) throw new Error("Proxy configuration did not load.");
  return __uv$config.prefix + __uv$config.encodeUrl(target);
}
async function navigate(input) {
  const target = search(input, ENGINE);
  if (!target) return;
  clearTimeout(loadTimer);
  showBrowser();
  loading.classList.remove("hidden");
  errorBox.hidden = true;
  setProgress(18);
  status.textContent = "Connecting…";
  try {
    await ensureProxy();
    const proxied = encodedProxyUrl(target);
    currentTarget = target;
    address.value = target;
    setProgress(48);
    frame.src = proxied;
    status.textContent = "Loading…";
    loadTimer = setTimeout(() => setProgress(82), 450);
  } catch (err) {
    loading.classList.add("hidden");
    errorBox.hidden = false;
    status.textContent = "Proxy error";
    setProgress(0);
    console.error(err);
  }
}

form.addEventListener("submit", e => { e.preventDefault(); navigate(address.value); });
heroForm.addEventListener("submit", e => { e.preventDefault(); navigate(heroAddress.value); });

document.querySelectorAll("[data-url]").forEach(btn => btn.addEventListener("click", () => navigate(btn.dataset.url)));
home.addEventListener("click", showHome);
reload.addEventListener("click", () => {
  if (browserView.hidden) return;
  if (frame.contentWindow) frame.contentWindow.location.reload();
});
back.addEventListener("click", () => { try { frame.contentWindow.history.back(); } catch (_) {} });
forward.addEventListener("click", () => { try { frame.contentWindow.history.forward(); } catch (_) {} });
retry.addEventListener("click", () => navigate(address.value || currentTarget));

frame.addEventListener("load", () => {
  clearTimeout(loadTimer);
  setProgress(100);
  loading.classList.add("hidden");
  status.textContent = "Ready";
  setTimeout(() => setProgress(0), 350);
  try {
    const href = frame.contentWindow.location.href;
    if (href.includes(__uv$config.prefix)) {
      const encoded = href.slice(href.indexOf(__uv$config.prefix) + __uv$config.prefix.length);
      if (encoded) {
        const decoded = __uv$config.decodeUrl(encoded);
        if (decoded) { currentTarget = decoded; address.value = decoded; }
      }
    }
  } catch (_) {}
});

window.addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
    e.preventDefault(); address.focus(); address.select();
  }
  if ((e.altKey || e.metaKey) && e.key === "ArrowLeft") { e.preventDefault(); back.click(); }
  if ((e.altKey || e.metaKey) && e.key === "ArrowRight") { e.preventDefault(); forward.click(); }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r") { e.preventDefault(); reload.click(); }
});
