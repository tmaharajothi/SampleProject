#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

var  task = function new_task_fun(x){
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'task_queue';
        var msg = process.argv.slice(2).join(' ') || "Hi Jo ................"+JSON.stringify(x);

        channel.assertQueue(queue, {
            durable: true
        });
        channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true
        });
        console.log(" [x] Sent '%s'", msg);
		return msg
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
}

//new_task_fun({"aaa":"bbb", "ccc":"ddd"});
module.exports = task;