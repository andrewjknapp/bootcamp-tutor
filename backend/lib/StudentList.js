const path = require('path');
const db = path.join(__dirname, '..', 'db', 'db.json');
const {readFile, writeFile} = require('fs')

class StudentList {
    constructor() {
        this.studentList = []
        this.refreshStudentList()
    }

    refreshStudentList() {
        readFile(db, (err, data) => {
            if (err) {
                throw new Error(err)
            } 
            this.studentList = JSON.parse(data);
        })
    }

    writeStudentData() {
        writeFile(db, JSON.stringify(this.studentList, ' ', 4), (err) => {
            if (err) {
                throw new Error(err)
            }
        })
    }

    updateStudent(index, newInfo) {
        let currentStudent = this.studentList[index]
        currentStudent = {...currentStudent, ...newInfo}
        this.studentList[index] = currentStudent
        this.writeStudentData()
    }

    removeStudent(index) {
        this.studentList.splice(index, 1)
        this.writeStudentData()
    }

    getStudentList() {
        return this.studentList;
    }
}

module.exports = StudentList;
