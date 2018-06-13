const express = require('express')
const router = express.Router()

router.route('/').get(function(request, response) {
    response.send('Hello World')
})

module.exports = router
