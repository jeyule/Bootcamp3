const express = require('express');
const bodyParser = require('body-parser');

//create express app
const app = express();

//parse req of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//parse req of content - type application/json
app.use(bodyParser.json())

//config db
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//connecting to db
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//def simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes. Take note quickly. Organize and keep track of all your notes."});
});

//require notes routes
require('./app/routes/note.routes.js')(app);

//listen
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});