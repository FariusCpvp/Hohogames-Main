"use strict";
function search(input, template) {
  input = String(input || "").trim();
  if (!input) return template.replace("%s", "");
  try { return new URL(input).toString(); } catch (_) {}
  try {
    const url = new URL(`https://${input}`);
    if (url.hostname.includes(".")) return url.toString();
  } catch (_) {}
  return template.replace("%s", encodeURIComponent(input));
}
