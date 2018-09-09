import { MapBlock, Map, MapPosition, MapMovable } from "../public/js/game/Map";
import { Player } from "../public/js/game/Player";
import { ShipBlock, BlockFactory } from "../public/js/game/Block";

const UPDATE_DISTANCE = 2000; //
const MAP_SIZE = 50000; //1000 = monitor width

export class ServerMap extends Map {

  constructor() {
    super(MAP_SIZE);
  }

  /*G*enerate server updates*/
  public generateUpdates(id: number): string {
    //TODO CODE REPEATING
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
      block.MaxHP = BlockFactory.blocks[block.ID].MaxHP;
      block.collectible = true;
      block.position.force = false;
      block.position.id = block.position.x * MAP_SIZE + block.position.y;
      self.blocks.push(block);
    });
    this.players.splice(this.players.indexOf(player), 1);
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
