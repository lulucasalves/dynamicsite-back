// server.js (Node.js)

const WebSocket = require("ws");
const http = require("http");

// Cria o servidor HTTP
const server = http.createServer();

// Cria o servidor WebSocket
const wss = new WebSocket.Server({ server });

// Array para armazenar as conexões ativas
let activeConnections = [];

wss.on("connection", (ws, req) => {
  const origin = req.headers.origin;
  const path = req.url;
  const clientIP = req.connection.remoteAddress;

  activeConnections = activeConnections.filter(
    (connection) => connection !== clientIP
  );

  activeConnections.push(clientIP);

  ws.on("message", (message) => {
    const object = JSON.parse(message);

    console.log({ object, activeConnections, path, origin });
  });
});

// Inicia o servidor na porta 8080
server.listen(8080, () => {
  console.log("Servidor WebSocket rodando na porta 8080");
});
