import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { connect } from './database/connect';
import { ErrorHandler } from './middlewares/error.middleware';
import { setupRouters } from './routes/main';

import 'dotenv/config';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static('../public'));

setupRouters(app);

app.use(ErrorHandler.notFound);

app.use(ErrorHandler.internalServerError);

async function startServer() {
  await connect();

  app.listen(Number(process.env.PORT), () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
}

startServer();
