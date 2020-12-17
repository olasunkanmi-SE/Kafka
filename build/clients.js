"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.kafkaHost = void 0;
var kafka_node_1 = require("kafka-node");
exports.kafkaHost = { kafkaHost: "localhost:9092" };
exports.client = new kafka_node_1.KafkaClient(exports.kafkaHost);
