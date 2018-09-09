import { ShipBlock } from "Block";
import { MapPosition, MapMovable } from "Map";

export class Player implements MapMovable {
  public rootBlock: ShipBlock;
  public name: string;
  public position: MapPosition;
}
