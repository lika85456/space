import * as socketIo from 'socket.io';
import * as express from "express";
import {ServerMap} from "ServerMap";
import {Player} from "../public/js/game/Player";
import {ShipBlock} from "../public/js/game/Block";

const MAP_UPDATE_TIMEOUT = 100;

export class GameServer{
  public io:socketIo.Server;
  /*Game data*/
  public map:ServerMap;
  private intervals:NodeJS.Timer[];

  constructor(public port:number){
    this.map = new ServerMap();
    let app = express();
    var server = app.listen(port, "0.0.0.0", function() {
        console.log('GameServer listening on port ' + port);
    });

    this.io = require('socket.io').listen(server);
    let self = this;
    this.io.on('connection', function(socket: socketIo.Socket){
      console.log("Player connected. Total: "+self.map.players.length);
      let player:Player = self.map.generateNewPlayer();
      //first of, emit map
      socket.emit(JSON.stringify(self.map));

      //every MAP_UPDATE_TIMEOUT ms update map
      self.intervals[player.id] = setInterval(()=>{
        socket.emit("mapupdate",self.map.generateUpdates(player.id));
      },MAP_UPDATE_TIMEOUT);

      socket.on("disconnect",()=>{
        console.log("Player disconnected. Total: "+self.map.players.length);
        self.map.deletePlayer(player.id);
        self.intervals[player.id].unref();
      });


      //socket.emit - to the one
      //socket.on - listener
      //self.emit - to all
    });

  }



}
