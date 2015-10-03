var Welcome = require('./controllers/welcome.js');

server.route({
  method: 'GET',
  path: '/',
  config: Welcome.index
});