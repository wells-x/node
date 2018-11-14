const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const bodyParser = require('body-parser');
const user = require('./user/users');
const driver = require('./drivers/index');
router.use(bodyParser.urlencoded({extended: false}));
/*
router.all('/', function (req, res, next) {
    res.send(JSON.stringify(req.query));
    // console.log(req.query,req.query.userName);
    console.log('get');
    // next();
});
*/

/*router.post('/', multipartMiddleware, function (req, res) {
    console.log(req.body);
    res.send(JSON.stringify(req.body));
});*/


router.use('/user', user);
router.use('/driver', driver);
module.exports = router;
// export  default router;
