import {MapBlock,IMap,MapMovable} from "../public/js/game/Map";
import {Player} from "../public/js/game/Player";
import {ShipBlock,BlockFactory} from "../public/js/game/Block";

const UPDATE_DISTANCE = 2000; //
const MAP_SIZE = 50000; //1000 = monitor width

export class ServerMap implements IMap{
  public size:number;
  public blocks:MapBlock[] = [];
  public players:Player[] = [];


  public generateUpdates(id:number):string{
    let MPlayers:MapMovable[] = [];
    //TODO
    return JSON.stringify({players:MPlayers});
  }

  public getPlayerById(id:number):Player{
    for(let i = 0;i<this.players.length;i++)
    {
      if(this.players[i].id==id) return this.players[i];
    }
  }

  public deletePlayer(id:number):void{
    let self = this;
    let player:Player = this.getPlayerById(id);
    let shipBlocks:ShipBlock[] = player.rootBlock.getChildrenRecursive();
    shipBlocks.forEach((element)=>{
      let position = element.getAbsolutePosition();
      let block = new MapBlock();
      block.x = position.x+player.x;
      block.y = position.y+player.y;
      block.angle = position.rotation;
      block.velocityAngle = 0;
      block.velocity = 0;
      block.ID = element.ID;
      block.HP = 0;
      block.MaxHP = BlockFactory.blocks[block.ID].MaxHP;
      block.collectible = true;
      self.blocks.push(block);
    });

  }

  /*Generates new player, adds him to map and return the instance*/
  public generateNewPlayer():Player{
    let player:Player = new Player();

    player.rootBlock = new ShipBlock(null,0,0);
    player.x = Math.floor(Math.random()*MAP_SIZE);
    player.y = Math.floor(Math.random()*MAP_SIZE);
    player.velocity = 0;
    player.angle = Math.random()*2*Math.PI;
    player.velocityAngle = 0;
    player.name = "Unnamed";
    player.id = this.players.length;

    this.players.push(player);
    return player;
  }
}
