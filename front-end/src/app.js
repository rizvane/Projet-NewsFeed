import axios from 'axios'

const webSocket = new WebSocket('ws://localhost:8888');

webSocket.onmessage = (e) => {
    let response = JSON.parse(e.data);
    console.log(e.data)
    console.log(response)
    if (response !== undefined) {
        let newsDivs = ""
        let i = 0
        response.forEach((article) => {
            if (article.title !== null && article.description !== null && article.urlToImage !== null && article.author !== null) {
                if (i === 0) {
                    newsDivs += "<div class='row'>"
                }
                newsDivs += "<div class ='col-xl-4 col-sm-6'>"
                newsDivs += "<p class='text-center font-weight-bold'>" + article.title + "</p>"
                newsDivs += "<img src='" + article.urlToImage + "' class='img-fluid'>"
                newsDivs += "<hr><p>" + (article.description.length > 20) ? article.description.slice(0, 20) + " ..." : article.description + "</p>"
                newsDivs += "<p>" + article.author + "</p>"
                newsDivs += "</div>"
                if (i === 0) {
                    newsDivs += "</div>"
                }
                i++
                if (i === 3) {
                    i = 0
                }
            }
        })
        document.getElementById("news").innerHTML = newsDivs + document.getElementById("news").innerHTML
        webSocket.send("reset")
    }
}



var url = new URL(window.location.href)

if(url.toString().includes('index.html')){
    axios.get('http://localhost:8080').then((httpResponse) => {
        console.log(httpResponse.data)
        let i = 0;
        let newsDivs = ""
        httpResponse.data.forEach((article) => {

            if(article.title !== null && article.description !== null && article.urlToImage !== null && article.author !== null) {
                if (i === 0) {
                    newsDivs += "<div class='row border'>"
                }
                newsDivs += "<div class='col-xs-12 col-sm-4 col-xl-4 border'>"
                newsDivs += "<p class='text-center font-weight-bold'>" + article.title + "</p>"
                newsDivs += "<img src='" + article.urlToImage + "' class='img-fluid'>"
                newsDivs += "<hr><p>" + (article.description.length > 20 ) ? article.description.slice(0,20) + " ..." : article.description + "</p>"
                newsDivs += "<p>" + article.author + "</p>"
                newsDivs += "</div>"

                if (i === 2) {
                  newsDivs += "</div>"
                }
                i++
                if(i === 3){
                    i = 0
                }
                console.log(newsDivs)
                document.getElementById("news").innerHTML = newsDivs
            }
        })

    }).catch((e) => {
        document.getElementById('container').innerHTML = "<h1>Erreur lors de la connexion au Back-End</h1>"
    })

}else{

}