/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
