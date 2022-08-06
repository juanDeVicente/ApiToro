import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http, { STATUS_CODES } from 'http';
import { GetData } from './service/get.data';
import { Environment } from './infrastructure/env';
import { exit } from 'process';
import { CalculateDistance } from './service/calculate.distance';

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

const getDataService = new GetData();
const calculateDistanceService = new CalculateDistance(getDataService);

app.get('/toro', async (req: Request, res: Response) => {
  var data = await getDataService.GetDataToros();
  res.json(data);  
});

app.get('/toro/distance', async (req: Request, res: Response) => {
  if (req.query.lat == undefined || req.query.lon == undefined)
    res.status(400).end();
    
  let lat: number = parseFloat(req.query.lat! as string);
  let lon: number = parseFloat(req.query.lon! as string);

  var toroDistance = await calculateDistanceService.getDistance(lat, lon);

  res.json(toroDistance);
});

http.createServer(app).listen(port, () => {
  console.log(`⚡️[server]: Server is running at port ${port}`);
});
