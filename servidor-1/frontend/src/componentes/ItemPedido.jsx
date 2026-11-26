
function Lanche_Pedido({ item }) {
  return (
    <p>
      {item.CodProduto} - {item.NomeProduto}
      | R$ {item.Preco} x {item.Qtd}
      = R$ {item.Subtotal}
    </p>
  )
}

export default Lanche_Pedido




