// import sql from './functions/mysql-new'
let sql = require('./functions/query');

/*
sql.query('SELECT * FROM user', function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
});
*/

sql.query('users').then(res => {
    console.log(res);
}, err => {
    console.log(err);
});
