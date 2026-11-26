
const express = require('express')
const router = express.Router()

const produtos = require('../dados/produtos')
const { consultarEstoque } = require('../servicos/estoque')

router.get('/', async (req, res) => {
  try {
    const estoques = await consultarEstoque()

    // junta os dados daqui com a quantidade que veio do servidor 3
    const cardapio = produtos.map(produto => {
      const itemEstoque = estoques.find(
        item => item.CodProduto === produto.codigo
      )

      return {
        ...produto,
        estoque: itemEstoque ? itemEstoque.Estoque : 0
      }
    })

    res.json(cardapio)
  } catch (erro) {
    res.status(500).json({
      mensagem: erro.message
    })
  }
})

module.exports = router
