const express = require('express')
const router = express.Router()
const axios = require('axios')
const news = require('./news.js')

router.route('/').get(function (request, response) {
    response.send(news.getHeadLines())

})

router.route('/news/:param/:id').get((request, response) => {
    if(request.params.param === "headlines"){
     response.send(news.getHeadLines()[request.params.id])
    }
})

router.route('/search/:keyword').get((request, response) => {
    news.addNews(null, null, request.params.keyword, false)
    setTimeout(() => {
        response.send(news.getSearchedNews(request.params.keyword))
    }, 1000)
})

router.route('/search/:keyword/renew').get((request, response) => {
    news.addNews(null, null, request.params.keyword, true)
    setTimeout(() => {
        response.send(news.getSearchedNews(request.params.keyword))
    }, 1000)
})


module.exports = router
