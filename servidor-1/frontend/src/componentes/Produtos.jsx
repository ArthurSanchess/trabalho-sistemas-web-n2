
function Produto({ codigo, nome, preco, estoque, imagem,
  quantidade, alterarQuantidade }) {
  return (
    <div className="produto">
      <img src={imagem} alt={nome} />

      <h3>{nome}</h3>

      <p>Código: {codigo}</p>
      <p>Preço: {preco}</p>
      <p>Estoque: {estoque}</p>

      <input
        type="number"
        min="0"
        value={quantidade}
        onChange={(e) => alterarQuantidade(e)}
      />
    </div>
  )
}

export default Produto
