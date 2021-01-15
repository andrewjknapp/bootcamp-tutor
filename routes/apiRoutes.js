const router = require('express').Router()

const {
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
} = require('../controllers/student-controller')

router
    .route('/students')
        .get(getAllStudents)
        .post(addStudent)
        .put(updateStudent)
        .delete(deleteStudent)

router
    .route('/students/:id')
        .get(getStudentById)
module.exports = router