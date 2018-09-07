'use strict';
import CONFIG from './config';
import * as express from 'express';
import * as path from "path";

const app = express();

app.set("port",process.env.PORT || CONFIG.PORT);
app.use(express.static(path.join(__dirname,"public")));
app.use(express.static('public'));
app.use(express.static("src"));
app.get("/connect",function(req,res){
  res.send("hello world");
});
app.listen(app.get("port"),()=>{
  console.log("Server started");
  console.log("Public files path: "+path.join(__dirname,"public"));
});
