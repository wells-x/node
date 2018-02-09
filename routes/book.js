let express = require('express'),
    router = express.Router(),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart(),
    bodyParser = require('body-parser'),
    query = require('../functions/query');
// console.log(query);

router.use(bodyParser.urlencoded({extended: false}));


router.get('/', function (req, res, next) {
    // console.log('get');
    console.log(req.url);
    query.selectFn({
        name: req.query.name,
        success: function (data, str) {
            let sendData = successData(data, str);
            res.send(JSON.stringify(sendData));
            // console.log((sendData));
        },
        error: function (data, str) {
            let sendData = errData(data, str);
            res.send(JSON.stringify(sendData));
            // console.log((sendData));
        }
    });
});

router.post('/add', multipartMiddleware, function (req, res) {
    console.log(req.url);

    if (!req.body.name || !req.body.age) {
        res.send(JSON.stringify(errData({}, '信息填写不完整')));
        return;
    }
    query('SELECT * FROM user',function (res,res2) {
        console.log(res, res2);
    })
   /* query.addFn({
        name: req.body.name,
        age: req.body.age,
        success: function (data, str) {
            var sendData = successData(data, str);
            res.send(JSON.stringify(sendData));
        },
        error: function (data, str) {
            var sendData = errData(data, str);
            res.send(JSON.stringify(sendData));
        }
    });*/
});
router.post('/delete', multipartMiddleware, function (req, res) {
    console.log(req.query, req.body);

    if (!req.body.id) {
        res.send(JSON.stringify(errData({}, '信息填写不完整')));
        return;
    }
    query.deletaFn({
        id: req.body.id,
        success: function (data, str) {
            var sendData = successData(data, str);
            res.send(JSON.stringify(sendData));
        },
        error: function (data, str) {
            var sendData = errData(data, str);
            res.send(JSON.stringify(sendData));
        }
    });
});


router.post('/update', multipartMiddleware, function (req, res) {
    console.log(req.url);

    if (!req.body.name && !req.body.age) {
        res.send(JSON.stringify(errData({}, '信息填写不完整')));
        return;
    }
    query.updateFn({
        name: req.body.name,
        age: req.body.age,
        success: function (data, str) {
            var sendData = successData(data, str);
            res.send(sendData);
        },
        error: function (data, str) {
            var sendData = errData(data, str);
            res.send(sendData);
        }
    });
});


function successData(obj, strings) {
    return {
        code: '0000',
        data: obj || {},
        successMessage: strings || '操作成功'
    };
}

function errData(obj, strings) {
    return {
        code: '9000',
        data: obj || {},
        errorMessage: strings || '失败'
    };
}


module.exports = router;
