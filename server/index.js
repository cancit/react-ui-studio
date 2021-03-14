const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log("Server started...");
});
const delay = 1000;
let ws;
wss.on("connection", (socket) => {
  ws = socket;
  console.log("Client connected...");
  send("Welcome!");
  ws.on("message", receive);
  ws.emit("");
});
const receive = (msg) => {
  console.log(`Received: ${msg}`);
  if (msg.type && msg.type === "ui") {
    ws.emit(msg);
  }
  setTimeout(() => send(msg), delay);
};
const send = (msg) => {
  ws.send(msg);
  console.log(`Sent: ${msg}`);
};
