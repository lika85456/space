'use strict';
import CONFIG from './config';
import * as express from 'express';
import * as path from "path";
import * as fs from "fs";

//Static file loading part
const app = express();

app.set("port",process.env.PORT || CONFIG.PORT);
//public files

//html & css & javascript libraries
app.use(express.static("public"));
//client js
app.use("/js/client",express.static("dist/client"));
app.use("/js/game",express.static("dist/game"));

app.listen(app.get("port"),()=>{
  console.log("Server started");
});
