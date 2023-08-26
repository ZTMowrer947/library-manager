import { createServer } from 'node:http';

const server = createServer((_req, res) => {
  res.end('Hello, world!');
});

server.listen(8080, () => {
  console.log('Server now listening on port 8080');
});
