import { ServerInfo } from "../../shared/game/Events";

export class DocumentHandler{

  public setServerSelector(servers: ServerInfo): void {
    this.setVisibility("loading_screen",false);
    this.setVisibility("server_chooser",true);
  }
  constructor (){

  }

  private setVisibility(elementId:string,visibility:boolean):void{
    document.getElementById(elementId).style.display = visibility?"block":"none";
  }
}
