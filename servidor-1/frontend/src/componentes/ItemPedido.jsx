
function Lanche_Pedido({ item }) {
  return (
    <p>
      {item.CodigoProduto} - {item.NomeProduto}
      | R$ {item.Preco} x {item.Quantidade}
      = R$ {item.total}
    </p>
  )
}

export default Lanche_Pedido




