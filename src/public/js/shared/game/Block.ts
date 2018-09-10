import {MapPosition} from "./Map";
import { blocks } from "./Config";
/**Actuall block factory*/

const TYPE_SQUARE = 0;


export class Block {
  public Name: string;
  public Tier: number;
  public BlockId: number;
  public Weight: number;
  public CPUDraw: number;
  public EnergyDraw: number;
  public MaxHP: number;
  public HP: number;
  public Type: number;
  public static Size = 64;
}

/**This is gonna be a "resource" for players, they get it if they destroy it*/
export class MapBlock {
  public ID: number;
  public HP: number;
  public MaxHP: number;
  public collectible: boolean;
  public position: MapPosition;
}



/** This is the actuall ship block */
export class ShipBlock {
  public parent: ShipBlock;
  public children: ShipBlock[] = [];
  public parentSide: number; //0-4(3 if triangle)
  public ID: number;

  constructor(parent: (ShipBlock | null), parentSide: number, ID: number) {
    this.parentSide = parentSide;
    this.ID = ID;
    this.parent = parent;
  }

  /**Returns a position for a root block*/
  public getAbsolutePosition(): { x: number, y: number, rotation: number } {
    if (!this.parent) return { x: 0, y: 0, rotation: 0 };
    let position: { x: number, y: number, rotation: number } = this.parent.getAbsolutePosition();
    let angle = 0;
    if (this.getSides() == 4) {
      angle = this.parentSide / 2 * Math.PI; //converts <0,4> to <0,2PI>
    }
    else {
      angle = this.parentSide / 3 * 2 * Math.PI; //converts to triangle angles(atleast i hope)
      position.rotation += angle;
    }
    position.x += Math.sin(angle) * Block.Size;
    position.y += Math.cos(angle) * Block.Size;
    return position;
  }


  public getChildrenRecursive(): ShipBlock[] {
    let array: ShipBlock[] = [];
    this.children.forEach((element: ShipBlock) => {
      array.push(element);
      array.concat(element.getChildrenRecursive());
    });
    return array;
  }

  public addChild(block: ShipBlock): void {
    this.children[block.parentSide] = block;
  }

  public generateSideBlocks(id: number): ShipBlock[] {
    let array: ShipBlock[] = [];
    let sides = this.getSides();
    for (let i: number = 0; i < sides; i++) {
      if (i == this.parentSide || this.children[i]) continue;
      array.push(new ShipBlock(this, i, id));
    }
    return array;
  }

  public getSides(): number {
    if (blocks[this.ID].Type && blocks[this.ID].Type == TYPE_SQUARE) {
      return 4;
    }
    else {
      return 3;
    }
  }

}
