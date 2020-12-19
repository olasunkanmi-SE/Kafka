"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
var kafka_node_1 = require("kafka-node");
var clients_1 = require("./clients");
var Publisher = /** @class */ (function () {
    function Publisher(topic, message) {
        this.topic = topic;
        this.message = message;
    }
    Publisher.prototype.publish = function () {
        var _this = this;
        //The producer writes to a topic
        var producer = new kafka_node_1.Producer(clients_1.client);
        //Initiate the producer
        producer.on("ready", function () {
            clients_1.client.refreshMetadata([_this.topic], function (err) {
                if (err) {
                    throw err;
                }
                console.log("Sending message to topic " + _this.topic + ": " + _this.message);
                var payload = {
                    topic: _this.topic,
                    messages: [_this.message],
                };
                producer.send([payload], function (err, result) {
                    console.log(err || result);
                    process.exit();
                });
            });
        });
        producer.on("error", function (err) {
            console.log("error", err);
        });
    };
    return Publisher;
}());
exports.Publisher = Publisher;
