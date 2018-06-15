const express = require('express')
const router = express.Router()
const axios = require('axios')
const news = require('./news.js')

var count = 0
router.route('/').get(function (request, response) {

    response.send(news.getHeadLines())

})

router.route('/news/:id').get((request, response) => {
    response.send(request.params)
})


module.exports = router
