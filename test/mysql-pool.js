var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function(req, res, next) {
	res.send(JSON.stringify(req.query));
	console.log('get'.green);
});

router.post('/',multipartMiddleware, function (req, res) {
	console.log(req.body);
	res.send(JSON.stringify(req.body));
});

module.exports = router;