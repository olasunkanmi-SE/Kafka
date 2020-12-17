"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publish = void 0;
var kafka_node_1 = require("kafka-node");
var clients_1 = require("./clients");
var Publish = /** @class */ (function () {
    function Publish(topic, message) {
        this.topic = topic;
        this.message = message;
    }
    Publish.prototype.publish = function () {
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
                var payload = { topic: _this.topic, messages: [_this.message] };
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
    return Publish;
}());
exports.Publish = Publish;
