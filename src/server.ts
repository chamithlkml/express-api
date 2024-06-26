import express, { Express } from 'express';
import { PORT } from './secrets'
import rootRouter from './routes';
import ErrorHandler from './middlewares/error-handler';
import { emailWorker } from './queues/workers/email-worker';
const app: Express = express();

app.use(express.json());

app.use('/api', rootRouter);

app.use(ErrorHandler)

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

emailWorker();

export default app;