// CommonJS ==> require
// ESModules ==> import
// internal module from node you need to import like "node:<package>"
import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

// Query Parameters: URL Stateful => Filtros, paginacao, nao obrigatorios
// http://localhost:3333/users?userId=1&name=Luan

// Route Parameters: Identificação de recurso
// http://localhost:3333/users/1

// Request Body: Envio de informações de formulários (HTTPs)

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    // console.log(extractQueryParams(routeParams.groups.query));

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(routeParams.groups.query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);
