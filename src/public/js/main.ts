import * as sio from "socket.io-client";
import * as game from "./client/Client";
import {DocumentHandler} from "./client/graphics/DocumentHandler";
import {AjaxModel} from "./client/models/AjaxModel";
import { ServerInfo } from "./shared/game/Events";
const documentHandler = new DocumentHandler();

let client:game.Client;

AjaxModel.loadUrl("/servers").then((responseJson:string)=>{
  documentHandler.setServerSelector(JSON.parse(responseJson) as ServerInfo);
});

if (window.location.href.includes("play?port")) {
  let port: number = Number(window.location.href.split("?port=")[1]);
  const socket = sio("http://localhost:" + port);
  console.log("Game started at port: " + port);
  client = new game.Client(true); //true for debug

  socket.addEventListener("map", client.parseMap);
  socket.addEventListener("MapUpdate", client.parseMapUpdate);
  socket.addEventListener("PlayerDisconnected",client.parsePlayerDisconnected);
  socket.addEventListener("PlayerConnected",client.parsePlayerConnected);
}
