const express = require('express')
const router = express.Router()
const axios = require('axios')

router.route('/').get(function (request, response) {
    axios.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=473711f17aff4f48a821fea3a931e2be'
    ).then((httpresponse) => response.send(httpresponse.data.articles))
})

router.route('/news').get((request, response) => {
    response.send('[{}]')
})


router.route('/news/:id').get((request, response) => {
    response.send(request.params)
})


module.exports = router
