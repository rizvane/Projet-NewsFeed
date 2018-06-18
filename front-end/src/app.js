import axios from 'axios'

const webSocket = new WebSocket('ws://localhost:8888');

webSocket.onmessage = (e) => {
    let response = JSON.parse(e.data);
    if (response !== undefined) {
        console.log(response)
    }
}



axios.get('http://localhost:8080').then((httpResponse) => {
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


}).catch((e) => {
    document.getElementById('container').innerHTML = "<h1>Erreur lors de la connexion au Back-End</h1>"
})

