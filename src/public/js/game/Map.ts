import {Loader} from "../connection/Util";
import {Player} from "Player";
/*This is gonna be a "resource" for players, they get it if they destroy it*/
export class MapBlock implements MapMovable{
  public velocityAngle: number;
  public angle: number;
  public velocity: number;
  public ID:number;
  public x:number;
  public y:number;
  public HP:number;
  public MaxHP:number;
  public collectible:boolean;
  /*public velocity:number;
  public rotationSpeed:number;
  public rotation:number;
  */
}

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
}

export interface MapUpdate{
  players:MapMovable;
  blocks:MapMovable;
}

/*Pretty much only container for other players, and mapblocks*/
export class Map implements IMap{
  public players: Player[];
  public size: number;
  public blocks:MapBlock[] = [];

  public update(updateString:string):void
  {

  }
}
