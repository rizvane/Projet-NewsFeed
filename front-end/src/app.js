import {messages} from "./messages";
import axios from 'axios'

const webSocket = new WebSocket('ws://localhost:8888');

webSocket.onmessage = (e) => {
    let response = JSON.parse(e.data);
    if(response !== undefined){
        axios.get('http://localhost:8080')
            .then(function (httpResponse) {
                console.log(httpResponse.data);
            })
    }else{
        document.getElementById('container').innerHTML = "<h1>Erreur lors de la connexion au Back-End</h1>"
    }

}