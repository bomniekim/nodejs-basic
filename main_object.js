var http = require("http"); // 로컬 서버와의 연결
var fs = require("fs"); // 파일 불러오기
var url = require("url"); // url에서 쿼리 스트링 가져오기
var qs = require("querystring");
var path = require("path");
var sanitizeHtml = require('sanitize-html');

// 객체화 
// refactorying: 동작 방법은 똑같으면서 내부의 코드를 더 효율적으로 바꾸는 행위
var template = require("./lib/template.js");

var app = http.createServer(function (request, response) {
  // http 모듈의 createServer 함수를 사용하여 서버 생성
  // request - 요청 시 웹브라우저가 보낸 정보
  // response - 응답 시 웹브라우저에게 보낼 정보
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathName = url.parse(_url, true).pathname; // 경로

  if (pathName === "/") {
    if (queryData.id === undefined) {
      // home main 설정

      fs.readdir("./data", function (err, filelist) {
        var title = "Welcome";
        var desc = "Hello node.js";
        var list = template.list(filelist);
        var html = template.html(
          title,
          list,
          `<h2>${title}</h2>${desc}`,
          `<a href="/create">create</a>`
          // main에서는 update X
        );

        response.writeHead(200);
        response.end(html);
      });
    } else {
      // 각각의 id 값에 따른 ul 화면 설정
      fs.readdir("./data", function (err, filelist) {
        var filteredId = path.parse(queryData.id).base;
        // 보안을 위해 경로를 탐색할 수 있는 정보를 숨기기
        fs.readFile(`data/${filteredId}`, "utf8", function (err, desc) {
          var title = queryData.id;
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDesc = sanitizeHtml(desc, {allowedTags: ['h1']});
          // sanitize하지 않고 허용할 태그들을 두번째 인자(객체)로 전달 
          var list = template.list(filelist);
          var html = template.html(
            sanitizedTitle,
            list,
            `<h2>${sanitizedTitle}</h2>${sanitizedDesc}`,
            `<a href="/create">create</a>
             <a href="/update?id=${sanitizedTitle}">update</a>
             <form action="/delete_process" method="post" onsubmit="return confirm('do you want to delete this file?')">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="delete">
             </form>
             ` // control
            // 글 삭제는 post 방식으로 보내고 링크가 아닌 form의 형태로
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    }
  } else if (pathName === "/create") {
    fs.readdir("./data", function (err, filelist) {
      var title = "WEB - create";
      var list = template.list(filelist);
      var html = template.html(
        title,
        list,
        `
        <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p><textarea name="desc" placeholder="description"></textarea></p>
        <p><input type="submit"></p>
        </form>
        
      `,
        ""
      );
      response.writeHead(200);
      response.end(html);
    });
  } else if (pathName === "/create_process") {
    // 포스트 방식으로 전송된 데이터 추출하기
    var body = "";
    request.on("data", function (data) {
      body = body + data;
      // 콜백이 실행될 때마다 body에 data를 추가
    });
    request.on("end", function () {
      // 정보 수신이 끝났을 때 실행되는 콜백
      var post = qs.parse(body); // post로 저장된 데이터
      var title = post.title;
      var desc = post.desc;
      // form으로 입력받은 데이터로 파일 생성하기
      fs.writeFile(`data/${title}`, desc, "utf8", function (err) {
        response.writeHead(302, { Location: `/?id=${title}` }); // page redirection
        response.end("success");
      });
    });
  } else if (pathName === "/update") {
    fs.readdir("./data", function (err, filelist) {
      var filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, "utf8", function (err, desc) {
        var title = queryData.id;
        var list = template.list(filelist);
        var html = templatel.html(
          title,
          list,
          `
                  <form action="/update_process" method="post">
                  <input type="hidden" name="id" value="${title}">
                  <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                  <p>
                  <textarea name="desc" placeholder="description">${desc}</textarea>
                  </p>
                  <p><input type="submit"></p>
                  </form>`,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
        response.writeHead(200);
        response.end(html);
        // 수정할 파일의 이름과 원래 파일의 이름을 구별하기 위해서 hidden field 사용
        // 아래와 같이 코딩 시 변경될 title과 원래 title인 id="${title}"의 정보를 숨겨서 전송
      });
    });
  } else if (pathName === "/update_process") {
    var body = "";
    request.on("data", function (data) {
      body = body + data;
      // 콜백이 실행될 때마다 body에 data를 추가
    });
    request.on("end", function () {
      // 정보 수신이 끝났을 때 실행되는 콜백
      var post = qs.parse(body); // post로 저장된 데이터
      var id = post.id;
      var title = post.title;
      var desc = post.desc;
      fs.rename(`data/${id}`, `data/${title}`, function (err) {
        fs.writeFile(`data/${title}`, desc, "utf8", function (err) {
          response.writeHead(302, { Location: `/?id=${title}` }); // page redirection
          response.end();
        }); // old path, new path, callbackFunc
      });
    });
  } else if (pathName === "/delete_process") {
    var body = "";
    request.on("data", function (data) {
      body = body + data;
      // 콜백이 실행될 때마다 body에 data를 추가
    });
    request.on("end", function () {
      // 정보 수신이 끝났을 때 실행되는 콜백
      var post = qs.parse(body); // post로 저장된 데이터
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function(err){
        response.writeHead(302, { Location: `/` }); // page redirection to main
        response.end();
      })
    });
  } else {
    response.writeHead(404);
    response.end("Not found"); // 404 error 설정
  }
});
app.listen(3000); // 3000번 포트로 접속
