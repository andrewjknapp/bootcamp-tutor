const express = require('express')
const path = require('path')
const dbInitialization = require('./initialization')
dbInitialization()

const apiRoutes = require(path.join(__dirname, 'routes', 'apiRoutes.js'));
const pageRoutes = require(path.join(__dirname, 'routes', 'pageRoutes.js'));


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'client', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);
app.use('/', pageRoutes)

app.get("*", function(req, res) {
    res.sendStatus(404)
  });



app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });