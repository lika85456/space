import * as socketIo from 'socket.io';
import * as express from "express";
import {ServerMap} from "./ServerMap";
import {Map} from "../public/js/game/Map";
const MAP_UPDATE_TIMEOUT = 50;

export class GameServer{
  public io:socketIo.Server;
  /*Game data*/
  public map:ServerMap;
  private intervals:NodeJS.Timer[] = [];

  constructor(public port:number){
    this.initiateIoServer(port);

    let self = this;
    this.io.on('connection', function(socket: socketIo.Socket){
      let player = self.map.generateNewPlayer();
      console.log(port+":Player connected. Total: "+self.map.players.length+ " IP:"+socket.handshake.address);
      //first of, emit map
      socket.emit("map",JSON.stringify(self.map as Map));

      //every MAP_UPDATE_TIMEOUT ms update map
      self.intervals[player.position.id] = setInterval(()=>{
        socket.emit("MapUpdate",self.map.generateUpdates(player.position.id));
      },MAP_UPDATE_TIMEOUT);

      self.io.emit("PlayerConnected",JSON.stringify(player));

      socket.on("disconnect",()=>{
        self.map.deletePlayer(player.position.id);
        clearTimeout(self.intervals[player.position.id]);
        self.io.emit("PlayerDisconnected",player.position.id);
        console.log(port+":Player disconnected. Total: "+self.map.players.length);
      });


      //socket.emit - to the one
      //socket.on - listener
      //self.emit - to all
    });

  }

  private initiateIoServer(port:number):void{
    this.map = new ServerMap();
    let app = express();
    var server = app.listen(port, "0.0.0.0", function() {
        console.log('GameServer listening on port ' + port);
    });

    this.io = require('socket.io').listen(server);

    this.io.origins('*:*');
  }


}
