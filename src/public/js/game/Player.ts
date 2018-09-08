import {ShipBlock} from "Block";
import {MapMovable} from "Map";

export class Player implements MapMovable{
  public rootBlock:ShipBlock;
  public x:number;
  public y:number;
  public velocity:number = 0;
  public angle:number = 0;
  public velocityAngle:number;
  public name:string;
  public id:number;

  public update(updateJson:MapMovable):void{
    this.x = updateJson.x;
    this.y = updateJson.y;
    this.velocity = updateJson.velocity;
    this.angle = updateJson.angle;
  }
}
