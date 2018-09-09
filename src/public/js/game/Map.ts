import { Player } from "./Player";


export class MapPosition {
  x: number = 0;
  y: number = 0;
  velocity: number = 0;
  velocityAngle: number = 0;
  angle: number = 0;
  force: boolean = false; //if thrusters are on
  id: number = 0; //object id, not type id
}

export interface MapMovable {
  position: MapPosition;
}

export class MapUpdate {
  players: MapPosition[];
  blocks: MapPosition[];
}

/*Map container*/
export class Map {
  public players: Player[] = [];
  public blocks: MapBlock[] = [];

  constructor(public size: number) {

  }

  public getPlayerById(id: number): Player {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].position.id == id) return this.players[i];
    }
    console.error("Player doesnt exists!");
    return new Player();
  }
}


/*This is gonna be a "resource" for players, they get it if they destroy it*/
export class MapBlock {
  public ID: number;
  public HP: number;
  public MaxHP: number;
  public collectible: boolean;
  public position: MapPosition;
}
