var mysql = require('mysql');

var sqlObj = {

    TEST_DATABASE: 'test',

    TEST_TABLE: 'user',

    insertSQL: 'insert into user(id, name, age) VALUES(0,?,?)',

    selectSQL: 'select * from user WHERE ?',

    deleteSQL: 'delete from user WHERE ',

    updateSQL: 'update user set name="conan update"  where id=',

    updateFn: function (updateData) {

        var that = this;

        that.init();

        var client = that.client;

        client.query(that.selectSQL, {name: updateData.name}, function (err, results, fields) {

            if (err) {

                throw err;

            }

            if (results.length > 0) {

                // console.log(results, 'updatesql');

                var updateSQL = 'update test set name="' + (updateData.name || results[0].name) + '", age="' + (updateData.age || results[0].age) + '" where id=' + results[0].id;

                // console.log(updateSQL);

                client.query(updateSQL, function (err, results, fields) {

                    if (err) {

                        updateData.error(err, '数据库错误');

                        throw err;

                    }

                    // if(results)

                    // {

                    if (updateData && updateData.success) {

                        updateData.success(results, '修改成功');

                    }

                    that.stop();

                    // }

                });

            } else if (results.length === 0) {

                if (updateData && updateData.error) {

                    updateData.error(results, '数据不存在');

                }

            }

        });

    },

    addFn: function (addData) {

        var that = this;

        that.init();

        var client = that.client;

        var addArr = [addData.name, addData.age];

        client.query(that.selectSQL, {name: addData.name}, function (err, results, fields) {

            if (err) {

                throw err;

            }

            if (results.length === 0) {

                client.query(that.insertSQL, addArr, function (err, results, fields) {

                    if (err) {

                        addData.error(err, '数据库错误');

                        throw err;

                    }

                    if (results) {

                        if (addData && addData.success) {

                            addData.success(results, '添加成功');

                        }

                        that.stop();

                    }

                });

            } else if (results.length > 0) {

                if (addData && addData.error) {

                    addData.error(results, '数据已存在');

                }

            }

            endData = results;

        });

    },

    selectFn: function (data) {

        var that = this;

        var endData = '';

        that.init();

        var client = that.client;

        var selectSQL = that.selectSQL;

        if (!data.name) selectSQL = 'select * from test';

        client.query(selectSQL, {name: data.name}, function (err, results, fields) {

            if (err) {

                throw err;

            }

            if (results) {

                if (data && data.fn) {

                    data.fn(results);

                } else if (data && data.success) {

                    data.success(results);

                }

            }

            endData = results;

        });

        that.stop();

        return endData;

    },

    deletaFn: function (deleteData) {

        var that = this;

        that.init();

        var client = that.client;

        var addArr = [deleteData.id, deleteData.age];

        client.query(that.selectSQL, {id: deleteData.id}, function (err, results, fields) {

            if (err) {

                throw err;

            }

            if (results.length !== 0) {

                client.query(that.deleteSQL + 'id = ' + deleteData.id, function (err, results, fields) {

                    if (err) {

                        throw err;

                    }

                    if (results) {

                        if (deleteData && deleteData.success) {

                            deleteData.success({}, '删除成功');

                        }

                        that.stop();

                    }

                });

            } else if (results.length === 0) {

                if (deleteData && deleteData.error) {

                    deleteData.error(results, '数据不存在');

                }

            }

            endData = results;

        });

    },

    runStatus: false,

    init: function () {

        var that = this;


        if (!that.runStatus) {

            that.client = mysql.createConnection({

                host: 'localhost',

                user: 'root',

                password: '123456',

                database: 'test'

            });

            that.client.connect();

            that.runStatus = true;

        }

    },

    stop: function () {

        var that = this;

        if (that.runStatus) {

            that.client.end();

            that.runStatus = false;

        }

    }

};

module.exports = sqlObj;
