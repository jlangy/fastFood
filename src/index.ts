import express = require('express');
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
require('dotenv').config();

const app: express.Application = express();
const PORT: number = Number(process.env.port) || 8001;
const dbUri: string = process.env.DB_URI || '';

mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('connected to db'))
  .catch(err => console.error(err));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/session', require('./routes/session'))
app.use('/users', require('./routes/users'))
app.use('/posts', require('./routes/posts'))

app.get('*', (req, res) => {
  res.send('Route Not Found');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});

