

import { useState, useEffect } from 'react'
import Produto from '../componentes/Produtos.jsx'

import imagemAcaraje from '../assets/Foto_acaraje.png'
import imagemBomba from '../assets/Foto_bomba.png'
import imagemBrigadeiro from '../assets/Foto_Brigadeiro.png'
import imagemCoca from '../assets/Foto_lata.png'
import imagemHamburguer from '../assets/Foto_X-tudo.png'

const imagensProdutos = {
  1: imagemAcaraje,
  2: imagemBomba,
  3: imagemBrigadeiro,
  4: imagemCoca,
  5: imagemHamburguer
}

const endereco_Api = 'http://localhost:3001'

function Cardapio() {
  const [produtos, setProdutos] = useState([])
  const [quantidades, setQuantidades] = useState({})
  const [nome, setNome] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [mensagem, setMensagem] = useState('')

  async function carregarProdutos() {
    try {
      const resposta = await fetch(`${endereco_Api}/produtos`)

      if (!resposta.ok) {
        throw new Error('Deu erro no produto')
      }

      const dados = await resposta.json()


      const lista = dados.map((produto) => ({
        ...produto,
        imagem: imagensProdutos[produto.codigo]
      }))

      setProdutos(lista)
    } catch (erro) {
      setMensagem(erro.message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarProdutos()
  }, [])

  async function enviarPedido() {
    // só entram no pedido os produtos com quantidade maior que 0
    const itens = produtos
      .filter((produto) => Number(quantidades[produto.codigo]) > 0)
      .map((produto) => ({
        CodProduto: produto.codigo,
        Qtd: Number(quantidades[produto.codigo])
      }))

    // a API espera as chaves com letra maiúscula

    const pedido = {
      NomeCliente: nome,
      Itens: itens
    }

    try {
      setMensagem('')

      const resposta = await fetch(`${endereco_Api}/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
      })

      if (!resposta.ok) {
        // a API devolve o motivo da recusa em mensagem
        const dados = await resposta.json()
        throw new Error(dados.mensagem || 'Erro ao enviar pedido.')
      }

      setMensagem('Pedido enviado')
      setQuantidades({})
      setNome('')
      // atualiza o estoque na tela após o pedido aceito
      await carregarProdutos()
    } catch (erro) {
      setMensagem(erro.message)
    }
  }

  if (carregando) return <p>Carregando...</p>

  return (
    <div className="pagina-cardapio">
      <h1>Cardápio</h1>

      <div className="dados-cliente">
        <label>Seu nome:</label>
        <input value={nome} onChange={e => setNome(e.target.value)} />
      </div>

      <div className="lista-produtos">
        {produtos.map(produto => (
          <Produto
            key={produto.codigo}
            codigo={produto.codigo}
            nome={produto.nome}
            preco={produto.preco}
            estoque={produto.estoque}
            imagem={produto.imagem}
            quantidade={quantidades[produto.codigo] || ''}
            alterarQuantidade={e => {
              const valor = e.target.value
              if (valor === '' || Number(valor) >= 0) {
                setQuantidades({
                  ...quantidades,
                  [produto.codigo]: valor
                })
              }
            }}
          />
        ))}
      </div>

      <button onClick={enviarPedido}>Fazer pedido</button>

      {mensagem && <p>{mensagem}</p>}
    </div>
  )
}

export default Cardapio