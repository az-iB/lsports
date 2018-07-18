import express from 'express'
var path = require('path')
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html'))
})

export default router
