var http = require('http');
var fs = require('fs');
var url= require('url'); // 모듈 url

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    // 쿼리 스트링 parse

    var title = queryData.id

    if(_url == '/'){
        title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    //response.end(fs.readFileSync(__dirname + url));
    // 프로그래밍적으로 사용자에게 전송할 데이터를 생성
    fs.readFile(`data/${queryData.id}`, 'utf8', function(err, desc){
        var template= `
    
        <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
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
    
    `
    response.end(template);
    })
   

    //response.end(queryData.id);
    // id의 값에 따라 쿼리데이터의 값이 달라짐
    // 쿼리 스트링에 따라 다르게 동작하는 페이지
    
});
app.listen(3000);