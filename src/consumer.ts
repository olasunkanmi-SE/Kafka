import {
  KafkaClient,
  Consumer,
  Message,
  Offset,
  OffsetFetchRequest,
  ConsumerOptions,
  KafkaClientOptions,
} from "kafka-node";
import { kafkaHost } from "./clients";

export class Subscriber {
  constructor(public topic: string) {}
  client: KafkaClient = new KafkaClient(kafkaHost);
  topics: OffsetFetchRequest[] = [{ topic: this.topic, partition: 0 }];
  options: ConsumerOptions = {
    autoCommit: false,
    fetchMaxWaitMs: 1000,
    fetchMinBytes: 1021 * 1024,
  };
  consumer: Consumer = new Consumer(this.client, this.topics, this.options);
  async subscribe() {
    await this.consumer.on("error", (err: Error): void => {
      console.log("error", err);
    });
    await this.client.refreshMetadata([this.topic], (err: Error): void => {
      const offset = new Offset(this.client);
      if (err) {
        console.log(err);
      }
      this.consumer.on("message", (message: Message): void => {
        console.log(message);
      });
      this.consumer.on("offsetOutOfRange", (topic: OffsetFetchRequest): void => {
        offset.fetch([topic], (err, offsets): void => {
          if (err) {
            return console.log(err);
          }
          const min = Math.min.apply(null, offsets[topic.topic][topic.partition!]);
          this.consumer.setOffset(topic.topic, topic.partition!, min);
        });
      });
    });
  }
}
