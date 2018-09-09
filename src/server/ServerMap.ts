import { MapBlock, IMap, MapMovable, MapUpdate,Map } from "../public/js/game/Map";
import { Player } from "../public/js/game/Player";
import { ShipBlock, BlockFactory } from "../public/js/game/Block";

const UPDATE_DISTANCE = 2000; //
const MAP_SIZE = 50000; //1000 = monitor width

export class ServerMap extends Map {

  constructor(size:number){
    super(size);
  }

  /*Generate server updates*/
  public generateUpdates(id: number): string {
    //TODO CODE REPEATING
    let generateBlocksUpdates = function(player: Player): MapMovable[] {
      let MBlocks: MapMovable[] = [];
      this.blocks.forEach((element:MapMovable) => {
        if (player.x > element.x - UPDATE_DISTANCE / 2 &&
          player.x < element.x + UPDATE_DISTANCE / 2 &&
          player.y > element.y - UPDATE_DISTANCE / 2 &&
          player.y < element.y + UPDATE_DISTANCE / 2) {
          let playerToPush: MapMovable = element as MapMovable;
          MBlocks.push(playerToPush);
        }
      });
      return MBlocks;
    };

    let generatePlayerUpdates = function(player: Player): MapMovable[] {
      let MPlayers: MapMovable[] = [];

      this.players.forEach((element:MapMovable) => {
        if (player.x > element.x - UPDATE_DISTANCE / 2 &&
          player.x < element.x + UPDATE_DISTANCE / 2 &&
          player.y > element.y - UPDATE_DISTANCE / 2 &&
          player.y < element.y + UPDATE_DISTANCE / 2) {
          let playerToPush: MapMovable = element as MapMovable;
          MPlayers.push(playerToPush);
        }
      });
      return MPlayers;
    };


    let player: Player = this.getPlayerById(id);
    if (player == null) {
      console.log("Sending to dead");
      return "";
    }
    return JSON.stringify({ players: this.generatePlayerUpdates(player),
      blocks: generateBlocksUpdates(player) });
  }


  public getPlayerById(id: number): Player {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id == id) return this.players[i];
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
      block.x = position.x + player.x;
      block.y = position.y + player.y;
      block.angle = position.rotation;
      block.velocityAngle = 0;
      block.velocity = 0;
      block.ID = element.ID;
      block.HP = 0;
      block.MaxHP = BlockFactory.blocks[block.ID].MaxHP;
      block.collectible = true;
      block.force = false;
      block.id = block.x * MAP_SIZE + block.y;
      self.blocks.push(block);
    });

    this.players.splice(this.players.indexOf(player), 1);
  }

  /*Generates new player, adds him to map and return the instance*/
  public generateNewPlayer(): Player {
    let player: Player = new Player();

    player.rootBlock = new ShipBlock(null, 0, 0);
    player.x = Math.floor(Math.random() * MAP_SIZE);
    player.y = Math.floor(Math.random() * MAP_SIZE);
    player.velocity = 0;
    player.angle = Math.random() * 2 * Math.PI;
    player.velocityAngle = 0;
    player.name = "Unnamed";
    player.id = this.getFirstEmptySlot();

    this.players[player.id] = player;
    return player;
  }

  private getFirstEmptySlot(): number {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i] == null) return i;
    }
    return this.players.length;
  }
}
