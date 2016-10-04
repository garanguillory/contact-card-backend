const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');


mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:auth/contact-card');
mongoose.connect(' mongodb://heroku_vhd2t52d:1bksek5m37rb4egbqpjdj2s8tf@ds049436.mlab.com:49436/heroku_vhd2t52d');


app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
router(app);


const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port Andre', port);