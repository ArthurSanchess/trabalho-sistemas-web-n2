const express = require('express')
const router = express.Router()

const estoque = require('../dados/estoque')

router.get('/', (req, res) => {
  res.json(estoque)
})

module.exports = router