const { body } = require('express-validator')

const validarItens = [
  body('Itens')
    .isArray({ min: 1 })
    .withMessage('A lista de itens não pode estar vazia'),

  body('Itens.*.CodProduto')
    .isInt({ min: 1 })
    .withMessage('O código do produto tem que ser um número inteiro positivo'),

  body('Itens.*.Estoque')
    .isFloat({ gt: 0 })
    .withMessage('A quantidade tem que ser maior que zero')
]

const validarReposicao = [
  body('Itens')
    .isArray({ min: 1 })
    .withMessage('A lista de itens não pode estar vazia'),

  body('Itens.*.CodProduto')
    .isInt({ min: 1 })
    .withMessage('O código do produto deve ser um número inteiro positivo'),

  body('Itens.*.Quantidade')
    .isFloat({ gt: 0 })
    .withMessage('A quantidade deve ser maior que zero')
]

module.exports = { validarItens, validarReposicao }