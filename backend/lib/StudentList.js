// Future Optimization

// const path = require('path');
// const db = require(path.join(__dirname, '..', 'db', 'db.json'));
// const {readFile} = require('fs')

// class StudentList {
//     constructor() {
//         this.studentList = []
//         this.updateStudentList()
//     }

//     updateStudentList() {
//         readFile(db, (err, data) => {
//             if (err) {
//                 console.error(err)
//                 return
//             } 
//             this.studentList = JSON.parse(data);
//         })
//     }

//     getStudentList() {
//         return this.studentList;
//     }
// }

// module.exports = StudentList;
