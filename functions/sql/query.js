const pool = require('./pool');
const Config = require('./config');

async function queryBase ({sql, value}) {
    // console.log(sql, value);
    const connection = await pool();
    return new Promise((resolve, reject) => {
        connection.query(sql, value || '', function (err, rows) {
            if (err) return reject(err);
            connection.release();
            resolve(rows);
        });
    })
}

module.exports = {
    async query ({account}) {
        let sql;
        if (account) {
            sql = Config.query;
        } else {
            sql = Config.queryAll;
        }
        return await  queryBase({sql, value: account})

    },
    async insert (user) {
        return await queryBase({sql: Config.insert, value: user})
    }
};
