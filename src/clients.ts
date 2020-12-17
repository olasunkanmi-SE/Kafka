import { KafkaClient, KafkaClientOptions } from "kafka-node";
export const kafkaHost: KafkaClientOptions = { kafkaHost: "localhost:9092" };
export const client: KafkaClient = new KafkaClient(kafkaHost);
