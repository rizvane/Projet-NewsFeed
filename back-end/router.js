const express = require('express')
const router = express.Router()
const axios = require('axios')
const news = require('./news.js')

router.route('/').get(function (request, response) {
    response.send(news.getHeadLines())

})

router.route('/news/:id').get((request, response) => {
    response.send(news.getHeadLines()[request.params.id])
})

router.route('/search/:keyword').get((request, response) => {
    news.addNews(request.params.keyword, false)
    setTimeout(() => {
        console.log(news.getSearchedNews(request.params.keyword))
        response.send(news.getSearchedNews(request.params.keyword))
    }, 2000)
})

router.route('/search/:keyword/renew').get((request, response) => {
    news.addNews(request.params.keyword, true)
    setTimeout(() => {
        console.log(news.getSearchedNews(request.params.keyword))
        response.send(news.getSearchedNews(request.params.keyword))
    }, 2000)
})


module.exports = router
