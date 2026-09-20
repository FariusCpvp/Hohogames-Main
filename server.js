import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { server as wisp, logging } from "@mercuryworkshop/wisp-js/server";

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 3000;
const mimeTypes = {
    ".css": "text/css; charset=utf-8",
    ".gif": "image/gif",
    ".html": "text/html; charset=utf-8",
    ".ico": "image/x-icon",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".wasm": "application/wasm",
};

logging.set_level(logging.NONE);
Object.assign(wisp.options, {
    allow_udp_streams: false,
    dns_servers: ["1.1.1.1", "1.0.0.1"],
});

function headers(contentType) {
    return {
        "Content-Type": contentType,
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Opener-Policy": "same-origin",
        "Service-Worker-Allowed": "/",
    };
}

const server = http.createServer((request, response) => {
    const requestPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const relativePath = requestPath === "/" ? "/index.html" : requestPath;
    const filePath = path.resolve(root, `.${relativePath}`);

    if (!filePath.startsWith(root) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        response.writeHead(404, headers("text/plain; charset=utf-8"));
        response.end("Not found");
        return;
    }

    response.writeHead(200, headers(mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream"));
    fs.createReadStream(filePath).pipe(response);
});

server.on("upgrade", (request, socket, head) => {
    if (request.url && request.url.endsWith("/wisp/")) {
        wisp.routeRequest(request, socket, head);
    } else {
        socket.end();
    }
});

server.listen(port, () => {
    console.log(`Farius running on http://localhost:${port}`);
});
