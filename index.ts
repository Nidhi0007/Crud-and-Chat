import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import route from './src/routes';
import mongoose from 'mongoose';
const bodyparser = require('body-parser');
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const url = process.env.URL!;
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use("/", route)

mongoose.connect(url)
  .then(result => app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  }))
  .catch(err => console.log(err))
