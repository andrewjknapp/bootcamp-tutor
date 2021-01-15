const express = require('express')
const path = require('path')
const dbInitialization = require('./initialization')

const apiRoutes = require(path.join(__dirname, 'routes', 'apiRoutes.js'));

dbInitialization()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'front-end', 'views', 'index.html'));
  });

app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });