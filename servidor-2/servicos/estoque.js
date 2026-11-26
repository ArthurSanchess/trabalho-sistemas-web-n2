const enderecoServidor3 = 'http://localhost:3002'

async function consultarEstoque() {
  try {
    const resposta = await fetch(`${enderecoServidor3}/estoque`)
    const dados = await resposta.json()

    if (!resposta.ok) {
      throw new Error(dados.mensagem || 'Erro ao consultar estoque')
    }

    return dados
  } catch (erro) {
    throw new Error('Servidor de estoque indisponível')
  }
}

async function baixarEstoque(itens) {
  try {
    const resposta = await fetch(`${enderecoServidor3}/baixa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Itens: itens })
    })

    const dados = await resposta.json()

    if (!resposta.ok) {
      throw new Error(dados.mensagem || 'Erro ao baixar estoque')
    }

    return dados
  } catch (erro) {
    throw new Error(erro.message || 'Servidor de estoque indisponível')
  }
}

module.exports = { consultarEstoque, baixarEstoque }
