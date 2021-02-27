const express = require('express');
const app = express()
require('./db/mongoose')
const port = process.env.PORT || 5000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})