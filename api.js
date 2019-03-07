require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/express.js');
const Promise = require('bluebird');
mongoose.Promise = Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`, {useNewUrlParser: true});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${process.env.DB_NAME}`);
});

app.listen(process.env.PORT || process.env.API_PORT, () => {
  // eslint-disable-next-line no-console
  // console.info(`API started on port ${process.env.API_PORT}`);
});

module.exports = app;
