const { Socket } = require("node:dgram");

// Invocamos el modulo que nos permite crear servidores
const net = require("node:net");
const { setTimeout } = require("node:timers/promises");
const PORT = 8080;
const HOST = "192.168.100.47";

const server = net
  .createServer((Socket) => {
    Socket.end("goodbye\n");
  })
  .on("error", (e) => {
    if (e.code === "EADDRINUSE") {
      console.error("Address in use, retrying...");
      setTimeout(1000, () => {
        server.close();
        server.listen(PORT, HOST, () => {
          console.log("Server on", server.address());
        });
      });
    }
  });

server.listen(PORT, HOST, () => {
  console.log("Server ON", server.address());
});
