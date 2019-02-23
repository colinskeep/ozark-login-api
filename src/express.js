const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const httpStatus = require('http-status');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./router.js');
const expressValidation = require('express-validation');
const expressWinston = require('express-winston');
const winston = require('winston');
const LogError = require('./v1/components/LogError.js');

const winstonInstance = winston.createLogger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true,
    }),
  ],
});

const corsOptions = {
  origin: (origin, callback) => {
    if (origin == undefined ||
      process.env.CORS_WHITELIST.indexOf(origin) !== -1 ||
      process.env.CORS_WHITELIST.indexOf(origin) === -1) {
      callback(null, true);
    } else {
      callback('Not allowed by CORS');
    }
  },
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Content-Length',
    'X-Requested-With',
    'Accept',
  ],
  methods: [
    'GET',
    'PUT',
    'POST',
    'DELETE',
    'OPTIONS',
  ],
  optionsSuccessStatus: 200,
};

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compress());
app.use(helmet());
app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true,
    msg: `HTTP {{req.method}} {{req.url}}
    {{res.statusCode}} {{res.responseTime}}ms`,
    colorStatus: true,
  }));
}

app.use('/', routes);

app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    return next(new LogError(err.errors.map((error) =>
      error.messages.join('. ')).join(' and '), err.status, true));
  } else if (!(err instanceof LogError)) {
    return next(new LogError(err.message, err.status, err.isPublic));
  }
  return next(err);
});

app.use((req, res, next) => {
  return next(new LogError('API not found', httpStatus.NOT_FOUND));
});

if (process.env.NODE_ENV !== 'test') {
  app.use(expressWinston.errorLogger({winstonInstance}));
}

app.use((err, req, res, next) =>
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  })
);

module.exports = app;
