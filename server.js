'use strict';

var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const fileAnalyzerRouter= require("./controller/fileanalyze");


// require and use "multer"...

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
        extended: false
    }))
app.use(bodyParser.json());

// Router for microservise

app.use('/api/fileanalyse',fileAnalyzerRouter);

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

// Not found middleware
app.use((req, res, next) => {
    return next({
        status: 404,
        message: 'not found'
    })
})

// Error Handling middleware
app.use((err, req, res, next) => {
    let errCode,errMessage

    if (err.errors) {
        // mongoose validation error
        errCode = 400 // bad request
            const keys = Object.keys(err.errors)
            // report the first validation error
            errMessage = err.errors[keys[0]].message
    } else {
        // generic or custom error
        errCode = err.status || 500
            errMessage = err.message || 'Internal Server Error'
    }
    res.status(errCode).type('txt')
    .send(errMessage)
})


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
