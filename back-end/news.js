const headLines = []
let updatedNews = []
let update = false

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('473711f17aff4f48a821fea3a931e2be');

newsapi.v2.topHeadlines({
    language: 'en',
    pageSize: 100
}).then(httpResponse => {
    httpResponse.articles.forEach((article) => {
        addNews(article, false)
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
                addNews(article)
            })
        }
    })
    console.log(headLines.length)
}, 5000)

function addNews(obj, bool = true){
    if(headLines.filter(article => article.url === obj.url).length === 0){
        headLines.push(obj)
        updatedNews.unshift(obj)
        update = bool
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

module.exports = { getHeadLines: getHeadLines, updateBool: updateBool, getUpdateBool: getUpdateBool, getUpdatedNews: getUpdatedNews, addNews: addNews }