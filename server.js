// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8089;
const listening  = () => console.log(`running on localhost: ${port}`);
const server = app.listen(port, listening)

const addData = (req, res) => { console.log(`Temprature:  ${req.body.temp}`);
                                        projectData = req.body;
                                        res.send("data added successfully")}
app.post('/saveData', addData)

const getData = (req, res) => res.send(projectData);

app.get('/getData', getData)