import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { hostname } from "node:os";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { server as wisp, logging } from "@mercuryworkshop/wisp-js/server";
import { scramjetPath } from "@mercuryworkshop/scramjet/path";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

const root = fileURLToPath(new URL("./", import.meta.url));
const libcurlPath = fileURLToPath(new URL("./node_modules/@mercuryworkshop/libcurl-transport/dist/", import.meta.url));
const port = Number(process.env.PORT) || 8080;

logging.set_level(logging.NONE);
Object.assign(wisp.options, {
    allow_udp_streams: false,
    dns_servers: ["1.1.1.1", "1.0.0.1"],
});

const app = Fastify({
    serverFactory: (handler) => createServer()
        .on("request", (request, response) => {
            response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
            response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
            handler(request, response);
        })
        .on("upgrade", (request, socket, head) => {
            if (request.url === "/wisp/") wisp.routeRequest(request, socket, head);
            else socket.end();
        }),
});

app.register(fastifyStatic, { root });
app.register(fastifyStatic, { root: scramjetPath, prefix: "/scram/", decorateReply: false });
app.register(fastifyStatic, { root: baremuxPath, prefix: "/baremux/", decorateReply: false });
app.register(fastifyStatic, { root: libcurlPath, prefix: "/libcurl/", decorateReply: false });

app.setNotFoundHandler((request, reply) => {
    reply.code(404).type("text/plain").send("Not found");
});

app.listen({ port, host: "0.0.0.0" }).then(() => {
    console.log(`Truffled is running at http://localhost:${port}`);
    console.log(`Network: http://${hostname()}:${port}`);
});
