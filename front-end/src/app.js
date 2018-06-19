import axios from 'axios'

var url = new URL(window.location.href)


// VERIFICATION SI LA PAGE EST INDEX.HTML

if(url.toString().includes('index.html')){

    const webSocket = new WebSocket('ws://localhost:8888');

    axios.get('http://localhost:8080').then((httpResponse) => {
        console.log(httpResponse.data)
        let i = 0;

        httpResponse.data.forEach((article, index) => {
            let newsDivs = ""
            if (i === 0) {
                newsDivs += "<div class='row'>"
            }
            newsDivs += "<div class='col-xl-4 col-sm-6'>"
            newsDivs += "<p class='text-center font-weight-bold'><a href='news.html?id=" + index + "'>" + article.title + "</a></p>"
            newsDivs += "<a href='news.html?id=" + index + "'><img src='" + article.urlToImage + "' class='img-fluid'></a>"
            newsDivs += "<hr><p>" + (article.description.length > 20 ) ? article.description.slice(0,20) + " ..." : article.description + "</p>"
            newsDivs += "<p>" + article.author + "</p>"
            newsDivs += "</div>"

            if (i === 0) {
                document.getElementById("news").innerHTML += "</div>"
            }
            i++
            if(i === 3){
                i = 0
            }
            document.getElementById("news").innerHTML = newsDivs + document.getElementById("news").innerHTML
        })

    }).catch((e) => {
        document.getElementById('container').innerHTML = "<h1>Erreur lors de la connexion au Back-End</h1>"
    })

    var count = 0

    webSocket.onmessage = (e) => {
        let response = JSON.parse(e.data);
        console.log(e.data)
        console.log(response)
        if (response !== undefined) {
            count += response.length
            document.getElementById('beforeBadge').innerHTML = "<div style='cursor: pointer;' onClick=\"window.location.reload()\" class='alert alert-primary' role='alert'>" + count + " nouveaux articles récupérés. <a onClick=\"window.location.reload()\"> Cliquez ici pour mettre à jour </a></div>"
            webSocket.send("reset")
        }
    }
}
// VERIFICATION SI LA PAGE EST NEWS.HTML
else if (url.toString().includes('news.html')){

    var id = url.searchParams.get('id')

    if(id === null){
        document.getElementById('news').innerHTML = "<h1>Une erreur s'est produite dans la requête</h1>"
    }else {
        axios.get('http://localhost:8080/news/' + id).then((httpResponse) => {
            let article = httpResponse.data

            let newsDivs = ""
            newsDivs += "<div class='col-xl-12 col-sm-12'>"
            newsDivs += "<p class='text-center font-weight-bold'><h1>" + article.title + "</h1></p>"
            newsDivs += "<img class='col-xl-12 col-sm-12' src='" + article.urlToImage + "' class='img-fluid'>"
            newsDivs += "<hr><p><h4>" + article.description + "</h4></p>"
            newsDivs += "<p class='text-right'>" + article.author + "</p>"
            newsDivs += "</div>"

            document.getElementById("news").innerHTML = newsDivs

            document.title = article.title

        }).catch((e) => {
            document.getElementById('news').innerHTML = "<h1>Erreur lors de la connexion au Back-End</h1>"
        })
    }
}else{
    var search = url.searchParams.get('search')
    if(search === ""){
        window.location.replace("index.html");
    }
    var lien = ""
    if(url.searchParams.get('renew') === null){
        lien = 'http://localhost:8080/search/' + search
    }else{
        lien = 'http://localhost:8080/search/' + search + '/renew'
    }
    axios.get(lien).then((httpResponse) => {
        let searched = httpResponse.data

        document.getElementById('beforeBadge').innerHTML = "<div style='cursor: pointer;' href='search.html?search=" + search + "&renew=true' class='alert alert-primary' role='alert'> Nombre de recherche: " + searched.count + " -  Dernière actualisation : " + searched.date + "<a href='search.html?search=" + search + "&renew=true'> Cliquez ici pour mettre à jour </a></div>"

        let newsDivs = ""

        searched.articles.forEach((lesArticles) => {
            lesArticles.forEach((article) => {

                if(article.title !== null && article.description !== null && article.urlToImage !== null && article.author !== null){
                    newsDivs += "<div class='col-xl-12 col-sm-12'>"
                    newsDivs += "<p class='text-center font-weight-bold'><h1>" + article.title + "</h1></p>"
                    newsDivs += "<img class='col-xl-10 col-sm-10' src='" + article.urlToImage + "' class='img-fluid'>"
                    newsDivs += "<hr><p><h4>" + article.description + "</h4></p>"
                    newsDivs += "<p class='text-right'>" + article.author + "</p>"
                    newsDivs += "</div>"
                }

            })
        })

        document.getElementById("news").innerHTML = newsDivs

        document.title = "Recherche news: '" + search + "'"

    }).catch((e) => {
        document.getElementById('news').innerHTML = "<h1>Erreur lors de la connexion au Back-End</h1>"
    })
}