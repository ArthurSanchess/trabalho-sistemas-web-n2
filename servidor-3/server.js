const express = require('express')
const cors = require('cors')

const rotaEstoque = require('./rotas/estoque')
const rotaBaixa = require('./rotas/baixa')
const rotaReposicao = require('./rotas/reposicao')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/estoque', rotaEstoque)
app.use('/baixa', rotaBaixa)
app.use('/reposicao', rotaReposicao)

const PORTA = 3002

app.listen(PORTA, () => {
  console.log(`Servidor 3 rodando na porta ${PORTA}`)
})