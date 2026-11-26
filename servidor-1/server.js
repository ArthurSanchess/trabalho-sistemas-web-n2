const express = require('express')
const path = require('path')

const app = express()

// entrega os arquivos gerados no build do react
app.use(express.static(path.join(__dirname, 'frontend', 'dist')))

// manda pro index.html caso a pessoa recarregue numa rota do react
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

const PORTA = 3000

app.listen(PORTA, () => {
  console.log(`Servidor 1 rodando na porta ${PORTA}`)
})
