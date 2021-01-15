const router = require('express').Router()

const {
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent,
} = require('../controllers/student-controller')

router
    .route('/students')
        .get(getAllStudents)
        .post(addStudent)
        .put(updateStudent)
        .delete(deleteStudent)

module.exports = router