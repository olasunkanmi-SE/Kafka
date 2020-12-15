"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = void 0;
var kafka_node_1 = require("kafka-node");
var kafkaHost = "localhost:9092";
exports.publish = function (topic, message) {
    //The client connects to Kafka
    var client = new kafka_node_1.KafkaClient({ kafkaHost: kafkaHost });
    //The producer writes to a topic
    var producer = new kafka_node_1.Producer(client);
    //Initiate the producer
    producer.on("ready", function () {
        client.refreshMetadata([topic], function (err) {
            if (err) {
                throw err;
            }
        });
    });
};
