import { Player } from "./Player";
import {MapBlock} from "./Block";

export class MapPosition {
  x: number = 0;
  y: number = 0;
  velocity: number = 0;
  velocityAngle: number = 0;
  angle: number = 0;
  force: boolean = false; //if thrusters are on
  id: number = 0; //object id, not type id

  public move(time:number,mapSize:number,drag:number):void{
    //We dont care of force, thats only for graphics
    this.x+=time*this.velocity*Math.sin(this.velocityAngle);
    this.y+=time*this.velocity*Math.cos(this.velocityAngle);
    //TODO Clamping
    if(this.x<0) this.x = 0;
    if(this.y<0) this.y = 0;
    if(this.x>mapSize) this.x = mapSize;
    if(this.y>mapSize) this.y = mapSize;
    //drag
    this.velocity *= drag;
  }

}

export interface MapMovable {
  position: MapPosition;
}

export class MapUpdate {
  players: MapPosition[];
  blocks: MapPosition[];
}

/*Map container*/
export class Map {
  public players: Player[] = [];
  public blocks: MapBlock[] = [];

  constructor(public size: number) {
  }

  public deletePlayerById(id:number):void{
    let player:Player = this.getPlayerById(id);
    this.players.slice(this.players.indexOf(player),1);
  }

  public getPlayerById(id: number): Player {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].position.id == id) return this.players[i];
    }
    console.error("Player doesnt exists!");
    return new Player();
  }

  public getBlockById(id: number):MapBlock{
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].position.id == id) return this.blocks[i];
    }
    console.error("Block doesnt exists!");
    return new MapBlock();
  }
}
