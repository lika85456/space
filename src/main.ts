'use strict';
import CONFIG from './config';
import * as express from 'express';
import * as path from "path";
import {ServerController} from "./server/ServerController";

//Static file loading part
const app = express();

app.set("port",process.env.PORT || CONFIG.PORT);
app.use(express.static(path.join(__dirname,"public")));
app.use(express.static('public'));
app.use(express.static("src"));
app.listen(app.get("port"),()=>{
  console.log("Server started");
  console.log("Public files path: "+path.join(__dirname,"public"));
});

let serverController:ServerController = new ServerController({
  maxServers:50,
  playersOnServer:100
});


app.get("/play",(req,res)=>{
  if(req.query.port==null)
  {
    res.redirect("/play?port="+serverController.getFreeServerPort());
  }
  res.sendFile(path.resolve("public","index.html"));
});

app.get("/servers",(req,res)=>{
  res.send(JSON.stringify(serverController.generateInfo()));
});
