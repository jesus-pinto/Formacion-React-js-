import express, { Express, Request, Response } from "express";
import { config } from "./config";
import { render } from "./render";
import axios from "axios";


const app: Express = express();

app.use(express.static('dist'))

app.get('/galaxia', async(req: Request, res:Response) => {
  try{
    const {data} = await axios.get("http://images-api.nasa.gov/search?q=galaxies")
  
    const initalProps = {
      galacies: data?.collection?.items
    }

    return(render(req.url, initalProps))
  } catch(error) {
    throw new Error("El error ocurren en /galaxias", error)
  }
  
  
})

app.get('/{\*todasLasRutas}', (req:Request, res:Response) => {
  res.send(render(req.url));
});


app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});