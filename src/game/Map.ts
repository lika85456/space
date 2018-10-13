import { Player } from "./Player";
import {MapBlock} from "./Block";

class Vector{
  strength:number;
  angle:number;
}

export class MapPosition {
  x: number = 0;
  y: number = 0;
  velocity: number = 0;
  velocityAngle: number = 0;
  angle: number = 0;
  force: boolean = false; //if thrusters are on
  id: number = 0; //object id, not type id
}

export interface MapMovable {
  position: MapPosition;
}

/*Map container*/
export class Map {
  public players: Player[] = [];
  public blocks: MapBlock[] = [];
  public mapSize:number = 10000;
  public drag:number = 0.95;

  constructor(public size: number) {
  }

  public addPlayer(player:Player):void{
    if(this.getPlayerById(player.position.id)==null)
      this.players.push(player);
  }

  public deletePlayerById(id:number):void{
    let player:Player = this.getPlayerById(id);
    console.log("Deleting "+this.players.indexOf(player));
    this.players.slice(this.players.indexOf(player),1);
  }

  public getPlayerById(id: number): Player {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].position.id == id) return this.players[i];
    }

    return null;
  }

  public getBlockById(id: number):MapBlock{
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].position.id == id) return this.blocks[i];
    }
    console.error("Block doesnt exists!");
    return new MapBlock();
  }

  public getColors():number[]{
    let ret = [0,0,0,0];
    this.players.forEach((e:Player)=>{
      ret[e.color]++;
    });
    return ret;
  }

  private moveMovable(ticks:number,movable:MapMovable):void{
    //We dont care of force, thats only for graphics
    movable.position.x+=ticks*movable.position.velocity*Math.sin(movable.position.velocityAngle);
    movable.position.y+=ticks*movable.position.velocity*Math.cos(movable.position.velocityAngle);
    //TODO Clamping
    if(movable.position.x<0) movable.position.x = 0;
    if(movable.position.y<0) movable.position.y = 0;
    if(movable.position.x>this.mapSize) movable.position.x = this.mapSize;
    if(movable.position.y>this.mapSize) movable.position.y = this.mapSize;
    //drag
    movable.position.velocity *= this.drag;
  }
}
