// import {Response} from '../class/index';
const {Response, ErrorResponse} = require('../../class/Response');
const express = require('express'),
    router = express.Router();
const pool = require('../../functions/sql/query');
// console.log(pool);

/* GET users listing. */
router
    .get('/', function (req, res, next) {
        res.send('respond with a resource');
    })

    .post('/', async function (req, res, next) {
        const item = await pool();
        console.log(item);
        res.send(new Response({data: item}))
        /*pool().then((connection) => {
            // console.log(connection);
            // res.send(JSON.stringify(new Response));
            connection.query('SELECT * FROM users', function (err, rows) {

                res.send(new Response({data: rows}));
                // 使用连接执行查询
                connection.release();
                //连接不再使用，返回到连接池
            })
        }).catch(err => {
            console.log(err);
            res.send(new ErrorResponse({data: err}))
        })*/
        /*const connection = await pool();
        connection.query('SELECT * FROM users', function (err, rows) {
            // console.log(JSON.stringify(this));
            res.send(new Response({data: rows}));
            // 使用连接执行查询
            connection.release();
            // connection.release();
            //连接不再使用，返回到连接池
        })*/
    })
    .use('/add', function (req, res) {
        res.send(new ErrorResponse({code: 404, msg: '路径错误1'}))
    });

module.exports = router;
// export default router
