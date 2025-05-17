import './header.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

export default function Header() {
    const navItems = ['INÍCIO', 'KANBAN', 'CONTATOS', 'PEDIDOS'];

    return (
        <header className="header">
            <img src={logo} width={50} height={50} />
            <div className="logo">Atelier Opção</div>
            <nav className="nav">
                {navItems.map((item) => {
                    const path = item === 'INÍCIO' ? '/' : `/${item.toLowerCase()}`;
                    return (
                        <Link
                            key={item}
                            to={path}
                            className={`nav-item ${item === 'INÍCIO' ? 'active' : ''}`}
                        >
                            {item}
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
};


