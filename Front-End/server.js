const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + 'The-Movie-Database-Project/dist/the-movie-database-project'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+
    'The-movie-Database-Project/dist/the-movie-database-project/index.html'));});
app.listen(process.env.PORT || 8080);

