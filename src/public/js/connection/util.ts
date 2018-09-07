export class Loading{
  public static config:object;

  /*Loads server config and passes it to callback, it loads only once*/
  public static loadServerConfig(callback:(config:object)=>void):void{
    if(!Loading.config){
      console.log("Downloading /config.json");
      Loading.get("/config.json").then((response)=>{
        console.log("Downloading /config.json succesfull");
        Loading.config = JSON.parse(response);
        callback(Loading.config);
      });

    }
    else
      callback(Loading.config);
  }

  private static get(url:string):Promise<string>{
    return new Promise((resolve)=>{
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function() {
          resolve(xhr.responseText);
      };
      xhr.send();

    });
  }
}
