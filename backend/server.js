const express = require('express')
const path = require('path')

const apiRoutes = require("./routes/apiRoutes");

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });

app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });