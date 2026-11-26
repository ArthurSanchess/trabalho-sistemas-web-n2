
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Cardapio from './paginas/Cardapio.jsx'
import Pedidos from './paginas/Pedidos.jsx'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Cardápio</Link>
        {' | '}
        <Link to="/pedidos">Pedidos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Cardapio />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
