const express = require('express')
const { validationResult } = require('express-validator')

const router = express.Router()

const estoque = require('../dados/estoque')
const { validarReposicao } = require('./validacoes')

router.post('/', validarReposicao, (req, res) => {
  const erros = validationResult(req)

  if (!erros.isEmpty()) {
    return res.status(400).json({
      mensagem: erros.array()[0].msg
    })
  }

  for (const item of req.body.Itens) {
    const produto = estoque.find(
      produto => produto.CodProduto === Number(item.CodProduto)
    )

    if (!produto) {
      return res.status(404).json({
        mensagem: `Produto ${item.CodProduto} não encontrado`
      })
    }
  }

  req.body.Itens.forEach(item => {
    const produto = estoque.find(
      produto => produto.CodProduto === Number(item.CodProduto)
    )

    produto.Estoque += Number(item.Quantidade)
  })

  res.json({
    mensagem: 'Estoque reposto com sucesso'
  })
})

module.exports = router