class Response {
    constructor (options) {
        const {msg, data, code} = options || {};
        this.msg = msg || '请求成功';
        this.data = data || {};
        this.code = code || 200;
    }
}

class ErrorResponse {
    constructor (options) {
        const {msg, data, code} = options || {};
        this.msg = msg || '请求失败';
        this.data = data || {};
        this.code = code || 400;
    }
}

module.exports = {Response, ErrorResponse};
