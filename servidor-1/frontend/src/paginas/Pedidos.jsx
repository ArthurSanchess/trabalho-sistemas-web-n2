import { useState, useEffect } from 'react'
import ItemPedido from '../componentes/ItemPedido.jsx'

const endereco_Api = 'http://localhost:3001'

function Pedidos() {
  const [pedidos, setPedidos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  async function carregarPedidos() {
    try {
      const resposta = await fetch(`${endereco_Api}/pedidos`)
      if (!resposta.ok) {
        throw new Error('Erro ao carregar pedidos')
      }
      const dados = await resposta.json()
      setPedidos(dados)
      setErro('')
    } catch (err) {
      setErro(err.message || 'Erro ao carregar pedidos')
    } finally {
      setCarregando(false)
    }
  }

  async function fecharPedido(id) {
    try {
      const resposta = await fetch(`${endereco_Api}/pedidos/${id}/fechar`, {
        method: 'POST'
      })

      if (!resposta.ok) {
        throw new Error('Erro ao fechar pedido')
      }

      await carregarPedidos()
    } catch (erro) {
      setErro(erro.message)
    }
  }

  useEffect(() => {
    carregarPedidos()
  }, [])

  if (carregando) return <p>Carregando...</p>

  return (
    <div className="pagina-pedidos">
      <h1>Pedidos</h1>

      <div className="lista-pedidos">
        {erro && <p>{erro}</p>}
        {pedidos.length === 0 && !erro && <p>Nenhum pedido</p>}

        {pedidos.map(pedido => (
          <div className="pedido" key={pedido.Id}>
            <h3>Pedido #{pedido.Id}</h3>
            <p><strong>Cliente:</strong> {pedido.NomeCliente}</p>
            <div className="itens-pedido">
              <h4>Itens:</h4>
              {pedido.Itens.map((item, i) => (
                <ItemPedido key={i} item={item} />
              ))}
            </div>
            <p><strong>Total:</strong> R$ {pedido.Total.toFixed(2)}</p>
            <button onClick={() => fecharPedido(pedido.Id)}>Fechar pedido</button>
          </div>
        ))}
      </div>

      <button onClick={carregarPedidos}>Atualizar</button>
    </div>
  )
}

export default Pedidos