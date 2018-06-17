const express = require('express')
const router = express.Router()
const axios = require('axios')
const news = require('./news.js')

router.route('/').get(function (request, response) {
    response.send(news.getHeadLines())
})


module.exports = router
