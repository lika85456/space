import { Server } from "./Server";
import { ServerInfo } from "../public/js/shared/game/Events";
//this tells user to wich server connect, if too many players, add servers otherwise turn off servers

interface IConfig {
  maxServers?: number;
  playersOnServer?: number;
}

export class ServerController {

  public gameServers: Server[] = [];
  private maxServers: number = 10;
  private playersOnServer: number = 100;

  constructor(config: IConfig) {
    if (config.maxServers) this.maxServers = config.maxServers;
    if (config.playersOnServer) this.playersOnServer = config.playersOnServer;
    this.addServer();
  }

  public getFreeServerPort(): number {
    for (let i = 0; i < this.gameServers.length; i++) {
      if (this.gameServers[i].map.players.length < this.playersOnServer) {
        return this.gameServers[i].port;
      }
    }
    if (this.gameServers.length < this.maxServers)
      return this.addServer();
    else
      return 8000 + Math.random() * this.gameServers.length;
  }

  public addServer(): number {
    this.gameServers.push(new Server(8000 + this.gameServers.length));
    return 7999 + this.gameServers.length;
  }

  public generateInfo():ServerInfo{
    let ret:ServerInfo = {servers:[]};
    this.gameServers.forEach((e)=>{
      ret.servers.push({port:e.port,players:e.map.players.length});
    });
    return ret;
  }
}
