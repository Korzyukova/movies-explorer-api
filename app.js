const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

require('dotenv').config();

const routes = require('./routes');
const auth = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandlers');

const app = express();
app.use(express.json());

app.use(requestLogger);
app.use(routes);
app.all('*', auth, (req, res) => {
  res.status(404).send('Not found');
});
app.use(errorLogger);
app.use(errorHandler);
app.use(errors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
const mongoURI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/bitfilmsdb';
mongoose.connect(mongoURI);
