import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './models/header/Header';
import Lembretes from './pages/Lembretes';
import Agenda from './pages/Agenda';
import Prazos from './pages/Prazos';
import Estoque from './pages/Estoque';
import Kanban from './pages/Kanban';
import Inicio from './pages/Inicio'; // Importa a página de Início
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/inicio" element={<Inicio />} /> {/* Página inicial */}
        <Route path="/lembretes" element={<Lembretes />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/prazos" element={<Prazos />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/kanban" element={<Kanban />} />
      </Routes>
    </Router>
  );
}

export default App;
