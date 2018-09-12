import { MapPosition } from "./Map";
import { Player } from "./Player";
import { MapBlock } from "./Block";

export interface ServerInfo{
  servers:{port:number,players:number}[];
}

export interface GameInfo{
  sides:{side:number,players:number,selectable:boolean}[];
}

/**This is for changed positions only*/
export interface MapUpdate{
  type: "MapUpdate";
  players:MapPosition[];
  blocks:MapPosition[]
}

export interface PlayerConnected{
  type:"PlayerConnected";
  player:Player;
}

export interface PlayerDisconnected{
  type:"PlayerDisconnected";
  playerId:number;
}

export interface AddedBlocks{
  type:"AddedBlocks";
  blocks:MapBlock[];
}

export interface RemovedBlocks{
  type:"RemovedBlocks";
  blocksIds:number[];
}

export interface PlayerUpdate{
  type:"PlayerUpdate";
  player:Player;
}

export interface BlockUpdate{
  type:"BlockUpdate";
  block:MapBlock;
}
