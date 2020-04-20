#!/usr/bin/env node
var client_cas = require('./cassandra');
var fc = require('./functions');
var cassandra = require('cassandra-driver');

var amqp = require('amqplib/callback_api');
var nodemailer = require('nodemailer');

amqp.connect('amqp://localhost', function (error, connection) {
    connection.createChannel(function (error, channel) {
        var queue = 'task_queue';

        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {

            var secs = msg.content.toString().split('.').length - 1;
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'maharajothit@gmail.com', // here use your real email
                    pass: 'm@harajo'
                }
            });

            var mailOptions = {
                from: 'maharajothit@gmail.com',
                to: 'maharajothit@gmail.com', //test my mailid
                subject: 'Mail from sample application',
                text: 'Greeting!....'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            console.log(" [x] Received -----------" + msg.content.toString());
            console.log(JSON.parse(msg.content.toString()));

            setTimeout(function () {
                console.log(" [x] Done");
                channel.ack(msg);
            }, secs * 1000);
        }, {
            noAck: false
        });
    });
});