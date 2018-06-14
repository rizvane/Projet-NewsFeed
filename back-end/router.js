const express = require('express')
const router = express.Router()
const axios = require('axios')

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('473711f17aff4f48a821fea3a931e2be');

const headLines = []

router.route('/').get(function (request, response) {

    newsapi.v2.topHeadlines({
        country: 'fr'
    }).then(httpResponse => {
        headLines.push(httpResponse.articles)
        response.send(headLines)
    })

})

router.route('/news/:id').get((request, response) => {
    response.send(request.params)
})


module.exports = router
