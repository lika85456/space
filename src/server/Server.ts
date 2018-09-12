import * as socketIo from 'socket.io';
import * as express from "express";
import {ServerMap} from "./models/ServerMap";
import {Map} from "../public/js/shared/game/Map";
import { Player } from '../public/js/shared/game/Player';
import { GameInfo } from '../public/js/shared/game/Events';
const MAP_UPDATE_TIMEOUT = 50;

export class Server{
  public io:socketIo.Server;
  /*Game data*/
  public map:ServerMap;
  private intervals:NodeJS.Timer[] = [];

  constructor(public port:number){
    this.initiateIoServer(port);

    let self = this;

    this.io.on('connection', function(socket: socketIo.Socket){
      //EVENT HANDLING
      socket.on("ColorSelection",(str:string)=>{
      if(isNaN(Number(str)))
      {
        socket.disconnect();
      }
      else{
        let player = this.map.generateNewPlayer(Number(str));
        console.log(port+":Player connected. Total: "+this.map.players.length+ " IP:"+socket.handshake.address);
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
      }
    });

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

  public generateGameInfo():GameInfo{
    //TODO Make it balanced, for now i use selectable=thrusters
    let ret:GameInfo = {sides:[]};
    let info:number[] = this.map.getColors();
    for(let i = 0;i<info.length;i++)
    {
      ret.sides.push({side:i,players:info[i],selectable:true});
    }
    return ret;
  }

}
