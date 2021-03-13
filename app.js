const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

console.log(process.env.ENV);
if (process.env.ENV === 'Test') {
  console.log('test');
  const testUri = "mongodb+srv://PS_Training_Admin:15PPKuFyzY7wOafC@banuchi-training.lm2g3.mongodb.net/bookAPI?retryWrites=true&w=majority";
  mongoose.connect(testUri);
} else {
  console.log('not test');
  const liveUri = "mongodb+srv://PS_Training_Admin:15PPKuFyzY7wOafC@banuchi-training.lm2g3.mongodb.net/bookAPI?retryWrites=true&w=majority";
  mongoose.connect(liveUri);
}

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
