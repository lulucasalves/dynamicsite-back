// server.js (Node.js)

const WebSocket = require("ws");
const http = require("http");
const express = require("express");
const cors = require("cors");

// Cria o servidor HTTP
const server = http.createServer();

// Cria o servidor WebSocket
const wss = new WebSocket.Server({ server });

// Array para armazenar as conexões ativas
let activeConnections = [];

wss.on("connection", (ws, req) => {
  const origin = req.headers.origin;
  const path = req.url;
  const clientIP = ws._socket.address();

  activeConnections = activeConnections.filter(
    (connection) => connection !== clientIP
  );

  activeConnections.push(clientIP);

  ws.on("message", (message) => {
    const object = JSON.parse(message);

    console.log({ object, activeConnections, path, origin });
  });
});

// Criando a aplicação
const app = express();
app.use(cors());

// Definindo a rota '/'
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Inicia o servidor na porta 8080
server.listen(8080, () => {
  console.log("Servidor WebSocket rodando na porta 8080");
});
