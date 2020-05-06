var http = require("http");
var fs = require("fs");
var url = require("url"); // 모듈 url

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathName = url.parse(_url, true).pathname;

  if (pathName == "/") {
    if (queryData.id === undefined) {
      // home
      fs.readFile(`data/${queryData.id}`, "utf8", function (err, desc) {
        var title = "Welcome";
        var desc = "Hello node.js";
        var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
              </head>
              <body>
              <title>WEB1 - ${title}</title>
              <h1><a href="/">WEB</a></h1>
              <ol>
                <li><a href="/?id=html">HTML</a></li>
                <li><a href="/?id=css">CSS</a></li>
                <li><a href="/?id=javascript">JavaScript</a></li>
              </ol>
              <h2>${title}</h2>
              <p>${desc}</p>
            </body>
            </html>
            
            `;
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readFile(`data/${queryData.id}`, "utf8", function (err, desc) {
        var title = queryData.id;
        var template = `
              <!doctype html>
              <html>
              <head>
                <title>WEB1 - ${title}</title>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <title>WEB1 - ${title}</title>
                <h1><a href="/">WEB</a></h1>
                <ol>
                  <li><a href="/?id=html">HTML</a></li>
                  <li><a href="/?id=css">CSS</a></li>
                  <li><a href="/?id=javascript">JavaScript</a></li>
                </ol>
                <h2>${title}</h2>
                <p>${desc}</p>
              </body>
              </html>
              
              `;
        response.writeHead(200);
        response.end(template);
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});

app.listen(3000);
