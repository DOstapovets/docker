const fs = require('fs/promises');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const PORT = 4000;
const {MONGO_URL} = process.env;

// TODO - static folder

app.get('/', (req, res) => {
  res.json({status:'OK'})
});

app.get('/create-file',async (req, res) => {
  const {fileName} = req.query;
  console.log('create', {fileName});
  await fs.writeFile(path.join('/app/storage', fileName), new Date().toISOString())
  res.json({status:'OK'})
});

app.get('/file', (req, res) => {
  const {fileName} = req.query;
  console.log('get', {fileName});
  res.sendFile(path.join('/app/storage', fileName))
});


mongoose.set('strictQuery', false);
console.log({ MONGO_URL });

mongoose.connect(MONGO_URL, async () => {
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
})

