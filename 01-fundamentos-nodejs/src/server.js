// CommonJS ==> require
// ESModules ==> import
// internal module from node you need to import like "node:<package>"
import http from "node:http";
import { Database } from "./database.js";
import { json } from "./middlewares/json.js";

// JSON - Javascript Object Notation
// Cabeçalhos (Requisição;resposta) => Metadados

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // middlewares sempre passam como parametro req e res
  await json(req, res);

  console.log(req.body);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");

    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    const user = {
      id: 1,
      name,
      email,
    };

    database.insert("users", user);

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333);
