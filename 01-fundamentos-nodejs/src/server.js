// CommonJS ==> require
// ESModules ==> import
// internal module from node you need to import like "node:<package>"
import http from "node:http";
import { json } from "./middlewares/json.js";

// JSON - Javascript Object Notation
// Cabeçalhos (Requisição;resposta) => Metadados

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // middlewares sempre passam como parametro req e res
  await json(req, res);

  console.log(req.body);

  if (method === "GET" && url === "/users") {
    return res.end(`Listagem de usuarios: ${JSON.stringify(users)}`);
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    users.push({
      id: 1,
      name,
      email,
    });

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333);
