import express, { Express, Request, Response } from "express";
import { config } from "./config";

const app: Express = express();

app.get('/{\*todasLasRutas}', (req:Request, res:Response) => {
  res.send(`<h1>Hola mundo desde las rutas: ${req.url}</h1>`);
});


app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});