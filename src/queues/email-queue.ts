import { Queue, Worker } from 'bullmq'

export const emailQueueName = 'email-queue';

export const emailQueue = new Queue(emailQueueName, {
  connection: {
    host: 'redis',
    port: 6379
  }
});
