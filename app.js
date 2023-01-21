const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const routes = require('./routes');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandlers');

const app = express();
app.use(express.json());

app.use(requestLogger);
app.use(routes);
app.all('*', (req, res) => {
  res.status(404).send('Not found');
});
app.use(errorLogger);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
