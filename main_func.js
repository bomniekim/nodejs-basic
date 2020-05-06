var http = require("http"); // 로컬 서버와의 연결
var fs = require("fs"); // 파일 불러오기 
var url = require("url"); // url에서 쿼리 스트링 가져오기

function templateHTML(title, list, body) {
    // 웹페이지를 생성할 html 함수 정의 
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
    // 동적으로 filelist를 불러올 함수 정의 
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
    // http 모듈의 createServer 함수를 사용하여 서버 생성
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathName = url.parse(_url, true).pathname; // 경로 

  if (pathName === "/") {
    if (queryData.id === undefined) {
      // home main 설정

      fs.readdir("./data", function (err, filelist) {
        var title = "Welcome";
        var desc = "Hello node.js";
        var list = templateList(filelist);
        var template = templateHTML(title, list, `<h2>${title}</h2>${desc}`);

        response.writeHead(200);
        response.end(template);
      });
    } else {
        // 각각의 id 값에 따른 ul 화면 설정
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
    response.end("Not found"); // 404 error 설정
  }
});

app.listen(3000); // 3000번 포트로 접속
