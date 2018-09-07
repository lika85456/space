import {Loading} from "../connection/util";

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
  public children:ShipBlock[];

  constructor(public rotation:number,public id:number){

  }

  public generateSideBlocks(id:number):ShipBlock[]{
    let array:ShipBlock[];
    let sides = this.getSides();
    for(let i:number = 0;i<sides;i++)
    {
      //array[i] = new ShipBlock();
    }
    return array;
  }

  public getSides():number{
    if(BlockFactory.blocks[this.id].Type && BlockFactory.blocks[this.id].Type==TYPE_SQUARE){
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
    Loading.loadServerConfig((config:any)=>{
      BlockFactory.blocks = config.blocks as Block[];
    });
  }
}
BlockFactory.initialize();
