import { Producer, ProduceRequest } from "kafka-node";
import { client } from "./clients";

export class Publisher {
  constructor(public topic: string, public message: string) {}

  publish(): void {
    //The producer writes to a topic
    const producer = new Producer(client);
    //Initiate the producer
    producer.on("ready", (): void => {
      client.refreshMetadata([this.topic], (err: Error): void => {
        if (err) {
          throw err;
        }

        console.log(`Sending message to topic ${this.topic}: ${this.message}`);
        let payload: ProduceRequest = { topic: this.topic, messages: [this.message] };
        producer.send([payload], (err: Error, result: ProduceRequest): void => {
          console.log(err || result);
          process.exit();
        });
      });
    });

    producer.on("error", (err: Error): void => {
      console.log("error", err);
    });
  }
}
