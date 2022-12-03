const { createServer } = require ("node:http");

function createApp() {
  return createServer((request, response) => {
    console.log("request received");

    response.statusCode = 200;

    response.setHeader("Content-Type", "text/html");

    const responseText = "<html><body><h1>We're on Mars!</h1></body></html>"

    response.end(responseText);
  });
}

module.exports = createApp;
