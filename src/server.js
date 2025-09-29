const http = require('http');
const querystring = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  if (request.method === 'POST') {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', () => {
      const bodyParams = querystring.parse(body);

      switch (request.url) {
        case '/addUser':
          jsonHandler.addUser(request, response, bodyParams);
          break;
        default:
          jsonHandler.getNotFound(request, response);
          break;
      }
    });
  } else {
    switch (request.url) {
      case '/':
        htmlHandler.getIndex(request, response);
        break;
      case '/getUsers':
      case '/getUsers?':
        if (request.method === 'HEAD') {
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end();
        } else {
          jsonHandler.getUsers(request, response);
        }
        break;
      case '/style.css':
        htmlHandler.getCSS(request, response);
        break;
      default:
        if (request.method === 'HEAD') {
          response.writeHead(404, { 'Content-Type': 'application/json' });
          response.end();
        } else {
          jsonHandler.getNotFound(request, response);
        }
        break;
    }
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
