export function postEncuesta(jsonAux){
    
    var http = new XMLHttpRequest();
    var url = "http://localhost:5000/encuestas";
    http.open("POST", url);

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) { 
           //aqui obtienes la respuesta de tu peticion
           alert(http.responseText);
        }
    }

    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    http.send(JSON.stringify(jsonAux));

    


  return 0
}