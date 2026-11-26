
const express = require('express')
const { body, param, validationResult } = require('express-validator')

const router = express.Router()

const produtos = require('../dados/produtos')
const pedidos = require('../dados/pedidos')
const { baixarEstoque } = require('../servicos/estoque')

// Registrar pedido
router.post(
  '/',
  [
    body('NomeCliente')
      .isString()
      .withMessage('o nome nao pode ultilizar numero e caracteres especiais')
      .trim()
      .isLength({ min: 6 })
      .withMessage('O nome deve ter no minimo 5 caracteres'),

    body('Itens')
      .isArray({ min: 1 })
      .withMessage('O pedido deve possuir pelo menos um item'),

    body('Itens.*.CodProduto')
      .isInt({ min: 1 })
      .withMessage('O código do produto deve ser um número inteiro positivo')
      .custom(codigo =>
        produtos.some(produto => produto.codigo === Number(codigo))
      )
      .withMessage('Produto não encontrado'),

    body('Itens.*.Qtd')
      .isFloat({ gt: 0 })
      .withMessage('A quantidade deve ser maior que zero')
  ],
  async (req, res) => {
    const erros = validationResult(req)

    if (!erros.isEmpty()) {
      return res.status(400).json({
        mensagem: erros.array()[0].msg
      })
    }

    try {
      // monta a lista com os dados completos de cada item e subtotal
      const itensPedido = req.body.Itens.map(item => {
        const produto = produtos.find(p => p.codigo === Number(item.CodProduto))

        return {
          CodProduto: produto.codigo,
          NomeProduto: produto.nome,
          Preco: produto.preco,
          Qtd: Number(item.Qtd),
          Subtotal: produto.preco * Number(item.Qtd)
        }
      })

      // calcula o valor total aqui no servidor conforme pedido no enunciado
      const total = itensPedido.reduce(
        (soma, item) => soma + item.Subtotal,
        0
      )

      const itensBaixa = itensPedido.map(item => ({
        CodProduto: item.CodProduto,
        Estoque: item.Qtd
      }))

      // pede pro servidor 3 descontar tudo de uma vez
      await baixarEstoque(itensBaixa)

      const novoPedido = {
        Id: Date.now(),
        NomeCliente: req.body.NomeCliente,
        Itens: itensPedido,
        Total: total
      }

      pedidos.push(novoPedido)

      res.status(201).json(novoPedido)
    } catch (erro) {
      res.status(400).json({
        mensagem: erro.message
      })
    }
  }
)

// Listar pedidos
router.get('/', (req, res) => {
  res.json(pedidos)
})

// Fechar pedido
router.post(
  '/:id/fechar',
  [
    param('id')
      .isInt({ min: 1 })
      .withMessage('O ID deve ser um número inteiro positivo')
  ],
  (req, res) => {
    const erros = validationResult(req)

    if (!erros.isEmpty()) {
      return res.status(400).json({
        mensagem: erros.array()[0].msg
      })
    }

    const id = Number(req.params.id)

    const indice = pedidos.findIndex(
      pedido => pedido.Id === id
    )

    if (indice === -1) {
      return res.status(404).json({
        mensagem: 'Pedido não encontrado'
      })
    }

    pedidos.splice(indice, 1)

    res.json({
      mensagem: 'Pedido feito com sucesso'
    })
  }
)

module.exports = router
