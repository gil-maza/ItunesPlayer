const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const tunesRoute = require('./routes/tunes');
const queriesRoute = require('./routes/queries');
require('dotenv/config');

app.use(bodyParser.json());
//allow cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

//Define Routes
app.use('/tunes', tunesRoute);
app.use('/queries', queriesRoute);

//Connect To DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('Connected To DB!')
);

app.listen(3000);