import { Worker } from "bullmq";
import { emailQueueName } from "../email-queue";

export const emailWorker = async () => {
  new Worker(emailQueueName, async (job) => {
    console.log('processing', job.data);
  }, {
    connection: {
      host: 'redis',
      port: 6379
    }
  });
  
  console.log('Email worker started...');
}