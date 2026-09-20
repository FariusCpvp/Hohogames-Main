import { createReadStream } from "node:fs";
import { existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";
import { Server } from "socket.io";

const root = fileURLToPath(new URL("./", import.meta.url));
const port = Number(process.env.PORT) || 8080;
const messages = [];
const mimeTypes = {
    ".css": "text/css; charset=utf-8",
    ".gif": "image/gif",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
};

function serve(request, response) {
    const requestedPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const relativePath = requestedPath === "/" ? "/index.html" : requestedPath;
    const filePath = normalize(join(root, relativePath));

    if (!filePath.startsWith(root) || !existsSync(filePath) || !statSync(filePath).isFile()) {
        response.writeHead(404);
        response.end("Not found");
        return;
    }

    response.writeHead(200, {
        "Content-Type": mimeTypes[extname(filePath).toLowerCase()] || "application/octet-stream",
    });
    createReadStream(filePath).pipe(response);
}

const httpServer = createServer(serve);
const io = new Server(httpServer, { maxHttpBufferSize: 10000 });

io.on("connection", (socket) => {
    socket.emit("chat history", messages);
    io.emit("online count", io.engine.clientsCount);

    socket.on("join", (name) => {
        socket.data.name = String(name || "Guest").trim().slice(0, 24) || "Guest";
        io.emit("system message", `${socket.data.name} joined the chat`);
        io.emit("online count", io.engine.clientsCount);
    });

    socket.on("chat message", (text) => {
        const messageText = String(text || "").trim().slice(0, 500);
        if (!messageText) return;

        const message = {
            name: socket.data.name || "Guest",
            text: messageText,
            time: new Date().toISOString(),
        };
        messages.push(message);
        if (messages.length > 100) messages.shift();
        io.emit("chat message", message);
    });

    socket.on("disconnect", () => {
        if (socket.data.name) io.emit("system message", `${socket.data.name} left the chat`);
        io.emit("online count", io.engine.clientsCount);
    });
});

httpServer.listen(port, "0.0.0.0", () => {
    console.log(`HOHOGAMES is running at http://localhost:${port}`);
});
