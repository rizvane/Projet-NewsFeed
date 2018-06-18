const headLines = []
let searchedNews = {}
let updatedNews = []
let update = false

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('473711f17aff4f48a821fea3a931e2be');

newsapi.v2.topHeadlines({
    language: 'en',
    pageSize: 100
}).then(httpResponse => {
    httpResponse.articles.forEach((article) => {
        addNews("headLines", article, null, false)
    })
    console.log(headLines.length)
})


setInterval(function(){
    newsapi.v2.topHeadlines({
        language: 'en',
        pageSize: 100
    }).then(httpResponse => {
        if(JSON.stringify(httpResponse.articles[0]) !== JSON.stringify(headLines[headLines.length-1])){
            updatedNews = []
            httpResponse.articles.forEach((article) => {
                addNews("headLines", article)
            })
        }
    })
    console.log(headLines.length)
}, 10000)

function addNews(arrayName, obj, keyword, bool = true){
    if(arrayName === "headLines"){
        if(headLines.filter(article => article.url === obj.url).length === 0){
            headLines.unshift(obj)
            updatedNews.unshift(obj)
            update = bool
        }
    }else{
        if(searchedNews[keyword] !== undefined && bool === false){
            newsapi.v2.everything({
                q: keyword,
                language: 'fr',
                pageSize: 100
            }).then(response => {
                var count = searchedNews[keyword].count + 1
                var date = searchedNews[keyword].date
                searchedNews[keyword] = {date: date, count: count, articles: response.articles}
            });
        }else{
            let date = new Date();
            let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
            let minutes = date.getUTCMinutes()
            if(minutes < 10){
                minutes = "0" + minutes
            }
            date = date.getUTCDate() + "/" + months[date.getUTCMonth()] + "/" + date.getUTCFullYear() + " à " + date.getUTCHours() + "h" + minutes
            newsapi.v2.everything({
                q: keyword,
                language: 'fr',
                pageSize: 100
            }).then(response => {
                searchedNews[keyword] = {date: date, count: 1, articles: response.articles}
            });
        }
    }
}

function updateBool(boolResult){
    update = boolResult
}

function getUpdateBool(){
    return update
}

function getHeadLines(){
    return headLines
}

function getUpdatedNews(){
    return updatedNews
}

function getSearchedNews(keyword){
    return searchedNews[keyword]
}

module.exports = {
    getHeadLines: getHeadLines,
    updateBool: updateBool,
    getUpdateBool: getUpdateBool,
    getUpdatedNews: getUpdatedNews,
    addNews: addNews,
    getSearchedNews: getSearchedNews
}