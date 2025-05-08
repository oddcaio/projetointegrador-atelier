import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="logo">
        {/* Aqui o logo será um link para a página de início */}
        <Link to="/inicio">
          <img src="logo.png" alt="Logo" />
        </Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/lembretes">Lembretes</Link></li>
          <li><Link to="/agenda">Agenda</Link></li>
          <li><Link to="/prazos">Prazos</Link></li>
          <li><Link to="/estoque">Estoque</Link></li>
          <li><Link to="/kanban">Kanban</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
