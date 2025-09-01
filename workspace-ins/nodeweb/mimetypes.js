const path = require('node:path');

// 요청 파일의 확장자에 따른 컨텐트 타입 지정
// JSON 표기법(JavaScript Object Notation)
const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  // ...
};

// 전달받은 url의 확장자를 이용해서 mime type을 반환
function getMime(url) {
  // /today.html -> 'text/html'
  // /layout.css -> 'text/css'
  const extname = path.extname(url);
  return mime[extname];
}

// require의 리턴값
module.exports = { getMime };