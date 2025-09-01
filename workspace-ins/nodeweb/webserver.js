const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
// const mime = require('./mimetypes');
// console.log(mime);
const mime = require('mime');

// __dirname: 현재 파일의 절대 경로
const home = path.join(__dirname, 'design');

// HTTP 서버 생성
// 클라이언트의 요청이 발생하면 호출되는 콜백 함수 등록
const server = http.createServer(function (req, res) {
  console.log(req.method, req.url, req.httpVersion);
  console.log(req.headers);

  // 요청 정보의 url과 매칭되는 파일을 읽어서 응답
  const filename = req.url;

  // const mimeType = mime.getMime(filename);
  const mimeType = mime.getType(filename);

  // 비동기 방식
  // TODO: 다음 중 Node.js에서 fs 모듈을 사용하여 비동기적으로 파일을 읽는 메서드는 무엇인가?
  fs.readFile(path.join(home, filename), function(err, data){
    console.log('2. readFile() 콜백 호출...');
    if(err){
      console.error(err.message);
      res.writeHead(404, { 'Content-Type': `text/html;charset=utf-8` });
      res.end(`<h1>${filename} 파일이 존재하지 않습니다.!!!</h1>`);
    }else{
      res.writeHead(200, { 'Content-Type': `${mimeType};charset=utf-8` });
      res.end(data);
    }
  });

  console.log('1. readFile() 호출 직후...');

  // 동기 방식
  // try {
  //   const data = fs.readFileSync(path.join(home, filename));
  //   res.writeHead(200, { 'Content-Type': `text/html;charset=utf-8` });
  //   res.end(data);
  // } catch (err) {
  //   console.error(err.message);
  //   res.writeHead(404, { 'Content-Type': `text/html;charset=utf-8` });
  //   res.end(`<h1>${filename} 파일이 존재하지 않습니다.</h1>`);
  // }



});

// 클라이언트 접속 대기
server.listen(1234, function () {
  console.log('http://localhost:1234 서버 구동 완료.');
});