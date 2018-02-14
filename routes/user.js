let express = require('express'),
    router = express.Router(),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart(),
    bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({extended: false}));
router.get('/', function (req, res, next) {
    res.send(JSON.stringify(req.query));
    // console.log(req.query,req.query.userName);
    console.log('get'.green);
    // next();
});

router.post('/', multipartMiddleware, function (req, res) {
    console.log(req.body);
    res.send(JSON.stringify(req.body));
});

module.exports = router;
