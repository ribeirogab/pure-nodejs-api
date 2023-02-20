import http from 'node:http';

const users = [];

const routes = {
  GET: {
    '/users': (_req, res) =>
      res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify({ users })),
  },
  POST: {
    '/users': (_req, res) => {
      const user = {
        id: users.length + 1,
        name: 'John Doe',
        email: 'example@email.com',
      };

      users.push(user);

      return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify({ user }));
    },
  },
};

const server = http.createServer((request, response) => {
  const { method, url } = request;

  if (!routes[method][url]) {
    return response.writeHead(404).end('Not found');
  }

  return routes[method][url](request, response);
});

server.listen(3333, () => {
  console.log('🚀 Server is running!');
});
