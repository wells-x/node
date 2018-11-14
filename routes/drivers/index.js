// import {Response} from '../class/index',
const {Response, ErrorResponse} = require('../../class/Response'),
    express = require('express'),
    router = express.Router(),
    sql = require('../../functions/sql/driver'),
    {clients} = require('../../functions/socket/index');

router
    .get('/', async function (req, res,) {
        let arr = [];
        let {id} = req.query;
        let s = await sql.query({id});
        console.log(s);
        clients.forEach(({id, deviceId, name, ws}) => {
            if (req.query.id === deviceId) {
                ws.send(JSON.stringify({path: '/user', message: req.query.message}))
            }
            arr.push({id, deviceId, name})
        });
        res.send('聊天室共有:' + clients.length + JSON.stringify(arr) + '司机：' + JSON.stringify(s));
    })

    .post('/', async function (req, res,) {
        // console.log(req.body, req.query,);

        clients.forEach(({id, deviceId, name, ws}) => {
            if (req.query.id === deviceId) {
                ws.send(JSON.stringify({path: '/user', message: req.query.message}))
            }
        });
        let {name, option} = req.body;

        if (!name) return res.send(new ErrorResponse({msg: '姓名不能为空'}));
        // res.send(req)
        const result = await sql.query(req.body).catch(e => {
            console.log(e);
        });
        console.log(result);
        if (result.length) {
            let date = result[0].update_time;
            console.log(new Date(date));
        } else {
            sql.insert({update_time: new Date(), name, option})
        }

        res.send(new Response({data: result}));
    });

module.exports = router;
