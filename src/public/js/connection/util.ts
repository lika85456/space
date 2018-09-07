export class Loader{
  public static config:object;

  /*Loads server config and passes it to callback, it loads only once*/
  public static loadServerConfig():Promise<object>{
    return new Promise((resolve)=>{
      if(!Loader.config){
        console.log("Downloading /config.json");
        Loader.get("/config.json").then((response)=>{
          console.log("Downloading /config.json succesfull");
          Loader.config = JSON.parse(response);
          resolve(Loader.config);
        });

      }
      else
        resolve(Loader.config);
    });

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
