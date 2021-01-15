const path = require('path')
const {writeFileSync, existsSync, write} = require('fs')
const db = path.join(__dirname, 'db', 'db.json')


const initialization = () => {
    try {
        if (!existsSync(db)) {
            const emptyData = []
            writeFileSync(db, JSON.stringify([], ' ', 4))
        }
    } 
    catch (err) {
        console.error('Initialization Error: ', err)
    }
}

module.exports = initialization