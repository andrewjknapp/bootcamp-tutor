const path = require('path')
const {readFileSync, writeFileSync} = require('fs')
const db = path.join(__dirname, '..', 'db', 'db.json')

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
    }
}
module.exports = controls