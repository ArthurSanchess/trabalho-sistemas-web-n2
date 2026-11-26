
const express = require('express')
const cors = require('cors')

const rotasProdutos = require('./rotas/produtos')
const rotasPedidos = require('./rotas/pedidos')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/produtos', rotasProdutos)
app.use('/pedidos', rotasPedidos)

const PORTA = 3001

app.listen(PORTA, () => {
  console.log(`Servidor 2 rodando na porta ${PORTA}`)
})
