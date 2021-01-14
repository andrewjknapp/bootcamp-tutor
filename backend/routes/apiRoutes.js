const router = require('express').Router()

const {
    getAllStudents
} = require('../controllers/student-controller')

router
    .route('/students')
    .get(getAllStudents)

module.exports = router