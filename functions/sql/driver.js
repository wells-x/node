const pool = require('./pool');

async function queryBase ({sql, value}) {
    const connection = await pool();
    return new Promise((resolve, reject) => {
        connection.query(sql, value || '', function (err, rows) {
            if (err) return reject(err);
            // connection.release();
            resolve(rows);
        });
    })
}

module.exports = {
    async query ({id}) {
        if (id) {
            console.log('o');
            return await queryBase({sql: `SELECT * FROM driver WHERE id = ?`, value: id})
        } else {
            console.log('a');
            return await queryBase({sql: `SELECT * FROM driver`,})
        }

    },
    /**
     * 表插入
     * @param id
     * @param update_time
     * @param name
     * @param option
     * @return {Promise<*>}
     */
    async insert ({update_time, name, option}) {
        return await queryBase({sql: `INSERT INTO driver SET ?`, value: {name, update_time, option}})
    },
    async update ({id, update_time, name, option}) {
        return await queryBase({
            sql: 'UPDATE users SET update_time = ?, name = ?, option = ? WHERE id = ?',
            value: [update_time, name, option, id],
        })
    },
};
