const express = require('express');
const app = express()
require('./db/mongoose')
const userRouter = require('./routers/user')
const port = process.env.PORT

app.use(express.json());
app.use(userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})