import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import fs from 'fs'
import { GetData } from './service/get.data';
import { Environment } from './infrastructure/env';
import { exit } from 'process';

dotenv.config();

var env = new Environment();
if (!env.validate())
{
  console.log(`Environment is not set properly, current state:`);
  console.log(env.toString());
  exit(-1);
}

const app: Express = express();
const port = process.env.PORT!;

app.get('/', async (req: Request, res: Response) => {
  var dataService = new GetData();
  var data = await dataService.GetDataToros();
  res.json(data);  
});

http.createServer(app).listen(port, () => {
  console.log(`⚡️[server]: Server is running at port ${port}`);
});
