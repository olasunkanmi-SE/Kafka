import { KafkaClient as Client, Producer, ProduceRequest } from "kafka-node";

const kafkaHost: string = "localhost:9092";

export const publish = (topic: string, message: string): void => {
  //The client connects to Kafka
  const client = new Client({ kafkaHost });
  //The producer writes to a topic
  const producer = new Producer(client);
  //Initiate the producer
  producer.on("ready", (): void => {
    client.refreshMetadata([topic], (err: Error): void => {
      if (err) {
        throw err;
      }
    });
  });
};
