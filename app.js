var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, './.env') });
var cors = require('cors');

const corsWhiteList = (process.env.CORSLIST || '').split('|');
const corsOptions = {
  origin: (origin, next)=>{
    console.log('CORS origin:', origin );
    if (corsWhiteList.includes(origin || "")) {
      next(null, true);
    } else {
      next(new Error('Not Allowed by Cors Policy'));
    }
  }
}

var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);




module.exports = app;
