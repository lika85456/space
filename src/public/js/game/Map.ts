import {Loader} from "../connection/Util";
/*This is gonna be a "resource" for players, they get it if they destroy it*/
export class MapBlock{
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

/*Pretty much only container for other players, and mapblocks*/
export class Map{

}
