const headLines = []
let searchedNews = []
let updatedNews = []

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('473711f17aff4f48a821fea3a931e2be');

newsapi.v2.topHeadlines({
    language: 'en',
    pageSize: 20
}).then(httpResponse => {
    httpResponse.articles.forEach((article) => {
        if(headLines.filter(oldArticle => oldArticle.url === article.url).length === 0 && article.title !== null && article.description !== null && article.urlToImage !== null && article.author !== null){
            headLines.unshift(article)
        }
    })
    console.log(headLines.length)
})


setInterval(function(){
    newsapi.v2.topHeadlines({
        language: 'fr',
        pageSize: 20
    }).then(httpResponse => {
        httpResponse.articles.forEach((article) => {
            if(headLines.filter(oldArticle => oldArticle.url === article.url).length === 0 && article.title !== null && article.description !== null && article.urlToImage !== null && article.author !== null) {
                headLines.push(article)
                updatedNews.push(article)
            }
        })
    })
}, 5000)


function addNews(keyword, limit=20, bool){
    if(searchedNews[keyword] !== undefined && bool === false && limit <= searchedNews[keyword].articles[0].length){
        var count = searchedNews[keyword].count + 1
        var date = searchedNews[keyword].date
        searchedNews[keyword] = {date: date, count: count, articles: searchedNews[keyword].articles}
        console.log(searchedNews[keyword])
    }else{
        let date = new Date();
        let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        let minutes = date.getUTCMinutes()
        if(minutes < 10){
            minutes = "0" + minutes
        }
        date = date.getUTCDate() + "/" + months[date.getUTCMonth()] + "/" + date.getUTCFullYear() + " à " + (date.getUTCHours()+2) + "h" + minutes
        newsapi.v2.everything({
            q: keyword,
            language: 'fr',
            pageSize: limit
        }).then(response => {
            searchedNews[keyword] = {date: date, count: 1, articles : []}
            searchedNews[keyword].articles.push(response.articles)
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