const headLines = []
let updatedNews = []
let update = false

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('473711f17aff4f48a821fea3a931e2be');

newsapi.v2.topHeadlines({
    country:'us'
}).then(httpResponse => {
    if(headLines.length === 0){
        httpResponse.articles.forEach(function(article){
            headLines.unshift(article)
        })
    }
    console.log(headLines.length)
})


setInterval(function(){
    newsapi.v2.topHeadlines({
        country:'us'
    }).then(httpResponse => {
        if(JSON.stringify(httpResponse.articles[0]) !== JSON.stringify(headLines[headLines.length-1])){
            addNews(JSON.stringify(httpResponse.articles[0]))
        }
    })
    console.log(headLines.length)
}, 1000)

function addNews(obj){
    if(obj !== JSON.stringify(headLines[headLines.length-1])){
        let theNews = JSON.parse(obj)
        if(headLines.filter(article => article.url === theNews.url).length === 0){
            headLines.unshift(theNews)
            updatedNews.push(theNews)
            update = true
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

function triggerUpdatedNews(){
    updatedNews = []
}

module.exports = { getHeadLines: getHeadLines, updateBool: updateBool, getUpdateBool: getUpdateBool, getUpdatedNews: getUpdatedNews, triggerUpdatedNews: triggerUpdatedNews, addNews: addNews }