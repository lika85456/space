export * from "./Block";
export * from "./Map";
export * from "./Player";

import { Map } from "./Map";
import { Player } from "./Player";

export class Game {
  public map: Map;

  constructor(private port: number, private debug: boolean = false) {

  }

  public addNewPlayer(player: Player) {
    this.map.players
    return player;
  }
}
