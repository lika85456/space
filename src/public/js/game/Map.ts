import {Loader} from "../connection/Util";
import {Player} from "Player";

/*CONSISTENCY*/
export interface IMap{
  size:number;
  blocks:MapBlock[];
  players:Player[];
}
export interface MapMovable{
  x:number;
  y:number;
  velocity:number;
  velocityAngle:number;
  angle:number;
  force:boolean;
  id:number;
}

export interface MapUpdate{
  players:MapMovable[];
  blocks:MapMovable[];
}

/*Pretty much only container for other players, and mapblocks*/
export class Map implements IMap{
  public players: Player[] = [];
  public blocks:MapBlock[] = [];

  constructor(public size:number)
  {

  }

  public getPlayerById(id: number): Player {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id == id) return this.players[i];
    }
    console.error("Player doesnt exists!");
    return new Player();
  }
}


/*This is gonna be a "resource" for players, they get it if they destroy it*/
export class MapBlock implements MapMovable{
  public id: number;
  public force: boolean;
  public velocityAngle: number;
  public angle: number;
  public velocity: number;
  public ID:number;
  public x:number;
  public y:number;
  public HP:number;
  public MaxHP:number;
  public collectible:boolean;
}
