// CommonJS ==> require
// ESModules ==> import
// internal module from node you need to import like "node:<package>"
import http from "node:http";

// JSON - Javascript Object Notation
// Cabeçalhos (Requisição;resposta) => Metadados

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  console.log(method, url);
  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-type", "application/json")
      .end(`Listagem de usuarios: ${JSON.stringify(users)}`);
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
    });

    return res.end("Criacao de usuarios");
  }

  return res.end("Hello World");
});

server.listen(3333);
