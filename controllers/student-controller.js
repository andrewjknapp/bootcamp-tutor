const path = require('path')
const {readFileSync, writeFileSync, write} = require('fs')
const db = path.join(__dirname, '..', 'db', 'db.json')
const {Student, StudentList} = require(path.join(__dirname, '..', 'lib'))
const {findIndexOfArrayById} = require(path.join(__dirname, '..', 'utils', 'utils.js'))

const studentListInstance = new StudentList()

const controls = {
    getAllStudents(req, res) {
        try {
            const allStudents = studentListInstance.getStudentList()
            res.json(allStudents)
        }
        catch (err) {
            res.sendStatus(500)
        }
    },
    addStudent({body}, res) {
        const {id, graduation_date, first_name, last_name, email, timezone, zoom_link} = body
        const student = new Student(id, graduation_date, first_name, last_name, email, timezone, zoom_link)

        try {
            const allStudents = studentListInstance.getStudentList()
            allStudents.push(student)
            studentListInstance.writeStudentData()
            console.log("Saved new student:", student.first_name, student.last_name)
            res.json(student)
        }
        catch (err) {
            console.error(err)
            res.sendStatus(500)
        }
    }, 
    updateStudent({body}, res) {
        console.log(body);
        const studentId = body.id
        const studentIndex = findIndexOfArrayById(studentId, studentListInstance.getStudentList())
        console.log(studentIndex)
        try {
            studentListInstance.updateStudent(studentIndex, body)
            res.sendStatus(200)
        }
        catch(err) {
            console.error(err)
            res.sendStatus(500)
        }
        
    },
    deleteStudent({body}, res) {

        const studentIndex = findIndexOfArrayById(body.id, studentListInstance.getStudentList())

        if (studentIndex === -1) {
            res.status(404)
        }

        studentListInstance.removeStudent(studentIndex)
        res.sendStatus(200)
    },
    getStudentById({params}, res) {
        const studentIndex = findIndexOfArrayById(params.id, studentListInstance.getStudentList())

        if (studentIndex === -1) {
            res.status(404)
        }

        res.json(studentListInstance.getStudentList()[studentIndex])
    }
}
module.exports = controls