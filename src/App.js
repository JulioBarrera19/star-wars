import React from 'react';
import Listado  from './components/Listado';
import Detalle  from './components/Detalle';
import Favoritos  from './components/Favoritos';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Listado />} />
          <Route exact path="/film/:id" element={<Detalle />} />
          <Route exact path="/favoritos" element={<Favoritos />} />
        </Routes>
    </Router>
  );
}

export default App;

