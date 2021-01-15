const router = require('express').Router()

const {
    getAllStudents,
    addStudent
} = require('../controllers/student-controller')

router
    .route('/students')
        .get(getAllStudents)
        .post(addStudent)

router
    .route('/students/:id')
        .get()
        .put()
        .delete()

module.exports = router