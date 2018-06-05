// import {Response} from '../class/index',
const {Response, ErrorResponse} = require('../../class/Response'),
    express = require('express'),
    router = express.Router(),
    query = require('../../functions/sql/query'), add = require('./add');

router
    .get('/', function (req, res,) {
        res.send('respond with a resource');
    })

    .post('/', async function (req, res,) {
        // console.log(req.body, req.query,);
        // res.send(req)
        const result = await query.query(req.body);
        res.send(new Response({data: result}));
    })
    .use('/add', add);

module.exports = router;
