# Trabalho N2 - Sistemas Web

Sistema de uma lanchonete para receber pedidos com retirada no balcão. O projeto usa Node.js, Express e React. Os dados ficam em memória, sem banco de dados.

## Como o projeto está dividido

- **Servidor 1 (porta 3000):** entrega as páginas do React compilado.
- **Servidor 2 (porta 3001):** mantém o catálogo, os preços e os pedidos. Calcula o total e conversa com o servidor de estoque.
- **Servidor 3 (porta 3002):** mantém o estoque e recebe consultas, baixas e reposições.

O React consulta somente o Servidor 2. As consultas e baixas no Servidor 3 são feitas pelo Servidor 2, usando `fetch` nativo.

O frontend usa React Router para as páginas e Vite para desenvolvimento e compilação. As APIs usam Express e `express-validator`; o CORS permite as chamadas entre as portas locais. O ESLint faz a verificação do código do frontend.

## Preparação

Use Node.js 22.19.0, versão usada na verificação do trabalho, com npm. Deixe as portas 3000, 3001 e 3002 livres.

Na pasta principal do projeto, instale as dependências de cada parte:

```sh
npm --prefix servidor-1 ci
npm --prefix servidor-2 ci
npm --prefix servidor-3 ci
npm --prefix servidor-1/frontend ci
```

Depois compile o React:

```sh
npm --prefix servidor-1/frontend run build
```

Esse comando gera `servidor-1/frontend/dist`, pasta usada pelo Servidor 1. Repita o build quando alterar o frontend. Rodar apenas o servidor de desenvolvimento do Vite não substitui essa etapa.

## Como executar

Abra três terminais na pasta principal e execute um comando em cada terminal:

```sh
npm --prefix servidor-1 start
```

```sh
npm --prefix servidor-2 start
```

```sh
npm --prefix servidor-3 start
```

Os processos iniciam separadamente. Para carregar o cardápio e enviar pedidos, os servidores 2 e 3 precisam estar disponíveis.

Abra no navegador:

- Cardápio: http://localhost:3000/
- Pedidos: http://localhost:3000/pedidos

Não é necessário configurar arquivo `.env`. Os endereços usam `localhost`, por isso a execução descrita é na mesma máquina.

No Cardápio, informe um nome com pelo menos cinco caracteres após retirar os espaços das extremidades, escolha as quantidades e envie. Na página Pedidos, use **Atualizar** para consultar a lista e **Fechar pedido** para remover um pedido aberto.

Pedidos, identificadores e estoques são mantidos em memória. Reiniciar o Servidor 2 limpa os pedidos e reinicia a numeração; reiniciar o Servidor 3 restaura o estoque inicial.

## Verificação do frontend

```sh
npm --prefix servidor-1/frontend run lint
npm --prefix servidor-1/frontend run build
```

Os scripts `test` dos servidores ainda são os padrões do npm e não contêm uma suíte de testes automatizados.

## Cópia para entrega

Prepare uma cópia separada para o envio. Exclua as pastas `node_modules` do ZIP e, nessa cópia, renomeie os arquivos `.js` para `.txt`, conforme a orientação do professor. Mantenha o código de desenvolvimento com a extensão original.

Para executar a cópia recebida, restaure os nomes `.js` antes da instalação e do build. Não renomeie os arquivos `.jsx` nem os `.json`. A pasta `dist` é gerada pelo build e não é versionada; o procedimento acima permite recriá-la.

O envio é por e-mail para `lucastalves@ucl.br`, com o assunto **Trabalho N2  Sistemas Web** e os nomes dos integrantes no corpo da mensagem.
