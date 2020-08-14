const http = require("http");

module.exports = () => {
  const matchers = {};

  const server = http.createServer((req, res) => {
    const { url, method } = req;

    return matchers?.[url]?.[method]
      ? matchers[url][method](req, res)
      : Object.assign(res, { statusCode: 404 }).end("No handler found");
  });

  const interface = {
    listen: (...args) => server.listen(...args),
  };

  const router = (method, path, ...handlers) => {
    matchers[path] = matchers[path] || {};

    if (matchers?.[path]?.[method]) {
      return;
    }

    matchers[path][method] = (req, res) => {
      const chain = [...handlers];

      const next = () => {
        if (chain.length === 0) {
          return;
        }

        const curr = chain.shift();
        curr(req, res, next);
      };

      next();
    };
  };

  return new Proxy(
    {},
    {
      get: (target, key) => {
        if (Object.hasOwnProperty.call(interface, key)) {
          return interface[key];
        }

        return router.bind(null, key.toUpperCase());
      },
    }
  );
};
