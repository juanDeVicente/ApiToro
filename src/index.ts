import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs'
import { GetData } from './service/get.data';
import { Environment } from './infrastructure/env';

dotenv.config();

var env = new Environment();
if (!env.validate())
{
  console.log(`Environment is not set properly, current state:`);
  console.log(env.toString());
}

const options = {
  key: fs.readFileSync(process.env.PRIVATE_KEY_PATH!),
  cert: fs.readFileSync(process.env.CERT_KEY_PATH!)
}
const app: Express = express();
const port = process.env.PORT!;

app.get('/', async (req: Request, res: Response) => {
  var dataService = new GetData();
  var data = dataService.GetDataToros();
  res.json(data);  
});

https.createServer(options, app).listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
