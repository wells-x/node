// import {Response} from '../class/index',
const {Response, ErrorResponse} = require('../../class/Response'),
    express = require('express'),
    router = express.Router(),
    query = require('../../functions/sql/query'),
    add = require('./add'),
    {clients} = require('../../functions/socket/index');

router
    .get('/', function (req, res,) {
        let arr = [];
        clients.forEach(({id, deviceId, name, ws}) => {
            if (req.query.id === deviceId) {
                // console.log(id, req.query.id, '/n', ws);
                ws.send(JSON.stringify({path: '/user', message: req.query.message}))
            }
            arr.push({id, deviceId, name})
        });
        res.send('聊天室共有:' + clients.length + JSON.stringify(arr));
    })

    .post('/', async function (req, res,) {
        // console.log(req.body, req.query,);
        // res.send(req)
        const result = await query.query(req.body);
        res.send(new Response({data: result}));
    })
    .use('/add', add);

module.exports = router;
