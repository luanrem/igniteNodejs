// CommonJS ==> require
// ESModules ==> import
// internal module from node you need to import like "node:<package>"
import http from "node:http";

const server = http.createServer((req, res) => {
  const { method, url } = req;

  console.log(method, url);
  if (method === "GET" && url === "/users") {
    return res.end("Listagem de usuarios");
  }

  if (method === "POST" && url === "/users") {
    return res.end("Criacao de usuarios");
  }

  return res.end("Hello World");
});

server.listen(3333);
