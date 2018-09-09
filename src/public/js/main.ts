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

}

/*This is after loading map*/
function startGame() {
  console.log("Game started");
}

function parseMapUpdate(str: string) {
  console.dir(str);
}
