const router = require('express').Router()
const path = require('path')


router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'public', 'views', 'index.html'));
  });

router.get('/addStudent', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'public', 'views', 'addStudent.html'))
})

module.exports = router