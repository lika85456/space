export * from "./Block";
export * from "./Map";
export * from "./Player";

import {Map} from "./Map";
import {Player} from "./Player";

export class Game{
  public map:Map;

  constructor(private port:number,private debug:boolean=false){

  }

  public addNewPlayer():Player{
    let player:Player = this.map.generateNewPlayer();
    console.log(this.port+":Player connected. Total: "+(self.map.players.length+1));
    return player;
  }
}
