import {Loader} from "../connection/Util";

const TYPE_SQUARE = 0;

/* Just pure data, loaded from server */
export class Block{
  public Name:string;
  public Tier:number;
  public ID:number;
  public Weight:number;
  public CPUDraw:number;
  public EnergyDraw:number;
  public MaxHP:number;
  public HP:number;
  public Type:number;
}


/* This is the actuall ship block */
export class ShipBlock{
  public parent:ShipBlock;
  public children:ShipBlock[] = [];
  public parentSide:number; //0-4(3 if triangle)
  public ID:number;

  constructor(parent:(ShipBlock|null),parentSide:number,ID:number){
    this.parentSide = parentSide;
    this.ID = ID;
    this.parent = parent;
  }

  public getChildrenRecursive():ShipBlock[]{
    let array:ShipBlock[] = [];
    this.children.forEach((element:ShipBlock)=>{
      array.push(element);
      array.concat(element.getChildrenRecursive());
    });
    return array;
  }

  public addChild(block:ShipBlock):void{
    this.children[block.parentSide] = block;
  }

  public generateSideBlocks(id:number):ShipBlock[]{
    let array: ShipBlock[] = [];
    let sides = this.getSides();
    for(let i:number = 0;i<sides;i++)
    {
      if(i==this.parentSide || this.children[i]) continue;
      array.push(new ShipBlock(this,i,id));
    }
    return array;
  }

  public getSides():number{
    if(BlockFactory.blocks[this.ID].Type && BlockFactory.blocks[this.ID].Type==TYPE_SQUARE){
      return 4;
    }
    else{
      return 3;
    }
  }

}

export class BlockFactory{
  public static blocks:Block[];
  //Automatically load blocks
  static initialize(){
  // WARNING: ANY here, try to remove it with interface maybe?
    Loader.loadServerConfig().then((config:any)=>{
      BlockFactory.blocks = config.blocks as Block[];
    });
  }

}

BlockFactory.initialize();
