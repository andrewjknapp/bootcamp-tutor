const path = require('path')
const {readFileSync, writeFileSync, write} = require('fs')
const db = path.join(__dirname, '..', 'db', 'db.json')
const {Student} = require(path.join(__dirname, '..', 'lib'))

const controls = {
    getAllStudents(req, res) {
        try {
            const allStudents = JSON.parse(readFileSync(db))
            console.log(allStudents)
            res.json(allStudents)
        }
        catch (err) {
            res.sendStatus(500)
        }
    },
    addStudent({body}, res) {
        const {id, graduation_date, first_name, last_name, email, timezone, zoom_link} = body
        const student = new Student(id, graduation_date, first_name, last_name, email, timezone, zoom_link)
        console.log(student.id)

        try {
            const allStudents = JSON.parse(readFileSync(db))

            allStudents.push(student)

            writeFileSync(db, JSON.stringify(allStudents, " ", 4))

            res.json(student)
        }
        catch (err) {
            console.error(err)
            res.sendStatus(500)
        }
    }
}
module.exports = controls