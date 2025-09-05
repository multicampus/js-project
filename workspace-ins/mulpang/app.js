var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const nocache = require('nocache');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// TODO Node.js에서 프로젝트의 의존성을 관리하고 npm 스크립트를 정의하는 파일은?
// package.json

// TODO Node.js 웹 프레임워크로, 빠르고 간단한 서버를 구축하는 사용되는 프레임워크는?
// Express

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 미들웨어(app.use(), router에 등록하는 함수)
// req, res, next를 매개변수로 갖는 함수로 작성
// 1. 처리하고 싶은 작업을 수행한다.
// 2. 둘중 하나의 작업으로 종료한다.
//  1) 다음 미들웨어를 호출한다.(next())
//  2) 클라이언트에 응답메세지를 전송한다.(res.render(), res.json(), res.redirect(), res.end() ... )
app.use(function(req, res, next){
  console.log('첫번째 미들웨어');
  console.log('req.body', req.body);
  console.log('req.cookies', req.cookies);
  console.log('req.session', req.session);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next){
  console.log('두번째 미들웨어');
  console.log('req.body', req.body);
  console.log('req.cookies', req.cookies);
  console.log('req.session', req.session);
  next();
});

app.use(logger('dev'));

app.use(nocache());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, `${req.url} Not Found!!!`));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
