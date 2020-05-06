var http = require("http");
var fs = require("fs");
var url = require("url"); // 모듈 url

function templateHTML(title, list, body) {
  return `
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
                  ${list}
                  ${body}
                </body>
                </html>
                
                `;
}

function templateList(filelist) {
  var list = "<ul>";
  var i = 0;
  while (i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i++;
  }
  list = list + "</ul>";
  return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathName = url.parse(_url, true).pathname;

  if (pathName === "/") {
    if (queryData.id === undefined) {
      // home 설정

      fs.readdir("./data", function (err, filelist) {
        var title = "Welcome";
        var desc = "Hello node.js";
        var list = templateList(filelist);
        var template = templateHTML(title, list, `<h2>${title}</h2>${desc}`);

        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("./data", function (err, filelist) {
        fs.readFile(`data/${queryData.id}`, "utf8", function (err, desc) {
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2>${desc}`);
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});

app.listen(3000);
