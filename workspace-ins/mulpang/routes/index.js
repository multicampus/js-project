var express = require('express');
var router = express.Router();

const model = require('../model/mulpangDao');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/today.html');
});

// 오늘 메뉴
router.get('/today', async function(req, res, next) {
  const list = await model.couponList();
  res.render('today', { list });
});

router.get('/:page.html', function(req, res, next) {
  res.render(req.params.page);
});

module.exports = router;
