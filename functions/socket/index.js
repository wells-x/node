const {isObject} = require("../../utils");

const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 3000, //监听接口
    });
let uuid = require('uuid');
let clients = [], startId = 0;

/**
 * 广播所有客户端消息
 * @param  {String} type     广播方式(admin为系统消息，user为用户消息)
 * @param  {String} message  消息
 * @param  {String} nickname 用户昵称，广播方式为admin时可以不存在
 */
function broadcastSend (type, message, nickname) {
    clients.forEach(function (v, i) {
        if (v.ws.readyState === v.ws.OPEN) {
            v.ws.send(JSON.stringify({
                "type": type,
                "nickname": nickname,
                "message": message
            }));
        }
    })
}

//广播
wss.broadcast = function broadcast (s, ws) {
    // console.log(ws);
    // debugger;
    clients.forEach(function each (client) {
        // if (typeof client.user != "undefined") {
        if (s === 1) {
            client.ws.send(ws.name + ":" + ws.msg);
        }
        if (s === 0) {
            client.ws.send(ws + "退出聊天室");
        }
        // }
    });
};


//监听连接
wss.on('connection', function (ws) {
    let client_uuid = uuid.v4();
    let nickname = `AnonymousUser${startId++}`;
    clients.push({
        "id": client_uuid,
        "deviceId": '',
        "ws": ws,
        "nickname": nickname
    });

    console.log(`client ${client_uuid} connected`);

    /**
     * 关闭服务，从客户端监听列表删除
     */
    function closeSocket () {
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].id === client_uuid) {
                let disconnect_message = `${nickname} has disconnected`;
                broadcastSend("notification", disconnect_message, nickname);
                clients.splice(i, 1);
            }
        }
    }

    /*监听消息*/
    ws.on('message', function (message) {
        try {
            message = JSON.parse(message)
        } catch (e) {
            console.log(e);
        }
        console.log(isObject(message), message);
        if (isObject(message)) {
            let {id} = message;
            if (id) {

                console.log(nickname, id, client_uuid);
                clients.forEach(item => {
                    if (item.id === client_uuid) {
                        item.deviceId = id;
                    }
                })
            }
        }

        /*if (message.indexOf('/nick') === 0) {
            let nickname_array = message.split(' ');
            if (nickname_array.length >= 2) {
                let old_nickname = nickname;
                nickname = nickname_array[1];
                let nickname_message = `Client ${old_nickname} change to ${nickname}`;
                broadcastSend("nick_update", nickname_message, nickname);
            }
        } else {
            broadcastSend("message", message, nickname);
        }*/
    });
    /*监听断开连接*/
    ws.on('close', function () {
        closeSocket();
    })
});

module.exports = {clients};
