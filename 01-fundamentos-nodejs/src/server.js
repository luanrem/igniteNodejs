// CommonJS ==> require
// ESModules ==> import
// internal module from node you need to import like "node:<package>"
import http from "node:http";

const server = http.createServer((req, res) => {
  return res.end("Hello World");
});

server.listen(3333);
