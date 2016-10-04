const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:auth/contact-card');
// mongoose.connect('mongodb://heroku_dbdzf73n:ogu1vjqksc47m45lv05srqq0vp@ds051595.mlab.com:51595/heroku_dbdzf73n');


app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
router(app);


const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port Andre', port);