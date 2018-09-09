import * as sio from "socket.io-client";
import * as game from "./game/Client";

let map: game.Map;

if (window.location.href.includes("play?port")) {
  let port: number = Number(window.location.href.split("?port=")[1]);
  const socket = sio("http://localhost:" + port);
  console.log("Game started at port: " + port);

  socket.addEventListener("map", (str: string) => {
    map = JSON.parse(str);
    console.log(str);
    startGame();
  });

  socket.addEventListener("MapUpdate", parseMapUpdate);
  socket.addEventListener("PlayerDisconnected",parsePlayerDisconnected);
}

/**This is after loading map*/
function startGame() {
  console.log("Game started");
}

function parseMapUpdate(str: string) {
  let mapUpdate = JSON.parse(str) as game.MapUpdate;
  mapUpdate.players.forEach((element:game.MapPosition)=>{
    map.getPlayerById(element.id).position = element;
  });
  mapUpdate.blocks.forEach((element:game.MapPosition)=>{
    map.getBlockById(element.id).position = element;
  });
}

function parsePlayerDisconnected(str:string){
  let playerId = parseInt(str);
  map.deletePlayerById(playerId);
}
