export class AjaxModel{
  public static loadUrl(url:string){
    return new Promise((resolve,reject)=>{
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              resolve(this.responseText);
         }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
    });
  }
}
