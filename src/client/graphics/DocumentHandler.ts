export class DocumentHandler{

  public setServerSelector(): void {
    this.setVisibility("loading_screen",false);
    this.setVisibility("server_chooser",true);
    //TODO servers table?
  }
  constructor (){

  }

  private setVisibility(elementId:string,visibility:boolean):void{
    document.getElementById(elementId).style.display = visibility?"block":"none";
  }
}
