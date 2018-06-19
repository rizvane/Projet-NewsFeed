const headLines = []
let searchedNews = {}
let updatedNews = []

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('473711f17aff4f48a821fea3a931e2be');

newsapi.v2.topHeadlines({
    language: 'en',
    pageSize: 20
}).then(httpResponse => {
    httpResponse.articles.forEach((article) => {
        if(headLines.filter(oldArticle => oldArticle.url === article.url).length === 0){
            headLines.unshift(article)
        }
    })
})


setInterval(function(){
    newsapi.v2.topHeadlines({
        language: 'fr',
        pageSize: 20
    }).then(httpResponse => {
        httpResponse.articles.forEach((article) => {
            var clength = headLines.filter(oldArticle => oldArticle.url === article.url).length
            if(clength === 0) {
                headLines.push(article)
                updatedNews.push(article)
            }
        })
    })
}, 10000)


function addNews(obj, keyword, bool){
    if(searchedNews[keyword] !== undefined && bool === false){
        newsapi.v2.everything({
            q: keyword,
            language: 'fr',
            pageSize: 20
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
            pageSize: 20
        }).then(response => {
            searchedNews[keyword] = {date: date, count: 1, articles: response.articles}
        });
    }
}

function resetUpdatedNews(){
    updatedNews = []
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
    getUpdatedNews: getUpdatedNews,
    addNews: addNews,
    getSearchedNews: getSearchedNews,
    resetUpdatedNews: resetUpdatedNews
}