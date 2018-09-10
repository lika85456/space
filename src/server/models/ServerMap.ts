import { Map, MapPosition, MapMovable } from "../../public/js/shared/game/Map";
import { Player } from "../../public/js/shared/game/Player";
import { ShipBlock, MapBlock } from "../../public/js/shared/game/Block";
import {blocks} from "../../public/js//shared/game/Config";

const UPDATE_DISTANCE = 2000; //
const MAP_SIZE = 50000; //1000 = monitor width
const DRAG = 0.95; //5% of velocity will be lost at the time

export class ServerMap extends Map {
  private lastTimeCalled:number;
  constructor() {
    super(MAP_SIZE);
    this.lastTimeCalled = new Date().getTime();

    setInterval(this.update,16); //60TPS
  }

  /**Called every server tick*/
  public update():void{
    //Time management
    let now = new Date().getTime();
    let time = now-this.lastTimeCalled;
    this.lastTimeCalled = now;

    //player&blocks movement
    if(this.players)
    this.players.forEach((player)=>{
      player.position.move(time,MAP_SIZE,DRAG);
    });

  }

  /**Generate server updates*/
  public generateUpdates(id: number): string {
    let generatePositionUpdate = function(player: Player, array: MapMovable[]): MapPosition[] {
      let MBlocks: MapPosition[] = [];
      array.forEach((element: any) => {
        let position: MapPosition = element.position;
        if (player.position.x > position.x - UPDATE_DISTANCE / 2 &&
          player.position.x < position.x + UPDATE_DISTANCE / 2 &&
          player.position.y > position.y - UPDATE_DISTANCE / 2 &&
          player.position.y < position.y + UPDATE_DISTANCE / 2) {
          MBlocks.push(position);
        }
      });
      return MBlocks;
    };

    let player: Player = this.getPlayerById(id);
    if (player == null) {
      console.log("Sending to dead");
      return "";
    }
    return JSON.stringify({
      players: generatePositionUpdate(player, this.players),
      blocks: generatePositionUpdate(player, this.blocks)
    });
  }


  public getPlayerById(id: number): Player {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].position.id == id) return this.players[i];
    }
    console.log("This player doesnt exists: " + id);
    console.dir(this.players);
  }

  public deletePlayer(id: number): void {
    let self = this;
    let player: Player = this.getPlayerById(id);
    let shipBlocks: ShipBlock[] = player.rootBlock.getChildrenRecursive();
    shipBlocks.forEach((element) => {
      let position = element.getAbsolutePosition();
      let block = new MapBlock();
      block.position.x = position.x + player.position.x;
      block.position.y = position.y + player.position.y;
      block.position.angle = position.rotation;
      block.position.velocityAngle = 0;
      block.position.velocity = 0;
      block.ID = element.ID;
      block.HP = 0;
      block.MaxHP = blocks[block.ID].MaxHP;
      block.collectible = true;
      block.position.force = false;
      block.position.id = block.position.x * MAP_SIZE + block.position.y;
      self.blocks.push(block);
    });
    super.deletePlayerById(id);
  }

  /**Generates new player, adds him to map and return the instance*/
  public generateNewPlayer(): Player {
    let player: Player = new Player();

    player.rootBlock = new ShipBlock(null, 0, 0);
    player.position = new MapPosition();
    player.position.x = Math.floor(Math.random() * MAP_SIZE);
    player.position.y = Math.floor(Math.random() * MAP_SIZE);
    player.position.velocity = 0;
    player.position.angle = Math.random() * 2 * Math.PI;
    player.position.velocityAngle = 0;
    player.name = "User"+Math.floor(Math.random()*10000);
    player.position.id = this.getFirstEmptySlot();

    this.players[player.position.id] = player;
    return player;
  }

  private getFirstEmptySlot(): number {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i] == null) return i;
    }
    return this.players.length;
  }
}
