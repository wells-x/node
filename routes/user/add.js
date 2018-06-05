// import {Response} from '../class/index';
const {Response, ErrorResponse} = require('../../class/Response');
const express = require('express'),
    router = express.Router();
// const query = require('../../functions/sql/query');


router
    .get('/', function (req, res,) {
        res.send('respond with a resource');
    })

    .post('/', async function (req, res,) {
        // const result = await query.query(req.body);
        res.send(new Response(req.body))
        // res.send(new Response({data: result}));
    });

module.exports = router;
