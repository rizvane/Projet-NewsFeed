import {messages} from "./messages";
import axios from 'axios'

const webSocket = new WebSocket("ws://localhost:8888")

function dispMessage(str) {
    document.getElementById("message").innerHTML = str;
}


/*webSocket.onmessage = (e) => {
    let response = JSON.parse(e.data);
    if (response !== undefined) {
        console.log(response)
    }

    axios.get('http://localhost:8080').then((httpResponse) => {
        console.log("Bonjour")
        httpResponse.data.forEach((article) => {
            document.getElementsByClassName('container').innerHTML += "<h3>" + article.title + "</h3>"
            document.getElementsByClassName('container').innerHTML += "<p>" + article.description + "</p>"
            document.getElementsByClassName('container').innerHTML += "<p>" + article.author + "</p>"
        })
    })
}*/

axios.get('http://localhost:8080').then((httpResponse) => {
    console.log("Bonjour")
    let i = 1;

    httpResponse.data.forEach((article) => {
        if (i % 4 === 0) {
            document.getElementById("news").innerHTML += "<div class='row'>"
        }
        document.getElementById("news").innerHTML += "<div class='col-xl-4 col-sm-6'>"
        document.getElementById("news").innerHTML += "<p class='text-center font-weight-bold'>" + article.title + "</p>"
        document.getElementById("news").innerHTML += "<img src=\"" + article.urlToImage + "\" class='img-fluid'>"
        document.getElementById("news").innerHTML += "<hr><p>" + article.description + "</p>"
        //document.getElementById("news").innerHTML += "<p>" + article.author + "</p>"
        document.getElementById("news").innerHTML += "</div>"

        if (i % 4 === 0) {
            document.getElementById("news").innerHTML += "</div>"
        }
        i++
    })


})

axios.get('http://127.0.0.1:8080').then((response) => console.log(response))
console.log('App.js loaded')
//console.log(messages)