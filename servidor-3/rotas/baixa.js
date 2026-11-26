const express = require('express')
const { validationResult } = require('express-validator')

const router = express.Router()

const estoque = require('../dados/estoque')
const { validarItens } = require('./validacoes')

router.post('/', validarItens, (req, res) => {
  const erros = validationResult(req)

  if (!erros.isEmpty()) {
    return res.status(400).json({
      mensagem: erros.array()[0].msg
    })
  }

  const quantidades = {}

  req.body.Itens.forEach(item => {
    const codigo = Number(item.CodProduto)
    const quantidade = Number(item.Estoque)

    quantidades[codigo] = (quantidades[codigo] || 0) + quantidade
  })

  // confere se todos os itens tem estoque antes de descontar qualquer um
  for (const codigo in quantidades) {
    const produto = estoque.find(
      item => item.CodProduto === Number(codigo)
    )

    if (!produto) {
      return res.status(404).json({
        mensagem: `Produto ${codigo} não encontrado`
      })
    }

    if (produto.Estoque < quantidades[codigo]) {
      return res.status(400).json({
        mensagem: `Estoque insuficiente para o produto ${codigo}`
      })
    }
  }

  // baixa atomica so desconta depois que confirmou que da pra atender tudo
  for (const codigo in quantidades) {
    const produto = estoque.find(
      item => item.CodProduto === Number(codigo)
    )

    produto.Estoque -= quantidades[codigo]
  }

  res.json({
    mensagem: 'Estoque atualizado com sucesso'
  })
})

module.exports = router