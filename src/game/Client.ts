import { Map, MapPosition } from "./Map";
import { Player } from "./Player";
import { MapUpdate } from "./Events";

export class Client {
  public map: Map;

  constructor(private debug: boolean = false) {

  }

  private onStartGame(){
    console.log("Zadek");
  }

  public addNewPlayer(player: Player) {
    this.map.players
    return player;
  }

  public parseMap(str: string):void {
    this.map = JSON.parse(str);
    console.log(str);
    this.onStartGame();
  }

  public parseMapUpdate(str: string):void {
    let mapUpdate = JSON.parse(str) as MapUpdate;
    mapUpdate.players.forEach((element:MapPosition)=>{
      this.map.getPlayerById(element.id).position = element;
    });
    mapUpdate.blocks.forEach((element:MapPosition)=>{
      this.map.getBlockById(element.id).position = element;
    });
  }

  public parsePlayerDisconnected(str:string):void{
    let playerId = parseInt(str);
    this.map.deletePlayerById(playerId);
  }

  public parsePlayerConnected(str:string):void{
    this.map.addPlayer(JSON.parse(str) as Player);
  }
}
