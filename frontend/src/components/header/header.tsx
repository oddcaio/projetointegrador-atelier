import './header.css';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';

export default function Header() {
    const navItems = ['INÍCIO', 'KANBAN', 'CONTATOS'];

    return (
        <header className="header">
            <img src={logo} width={50} height={50} />
            <div className="logo">Atelier Opção</div>
            <nav className="nav">
                {navItems.map((item) => {
                    const path = item === 'INÍCIO' ? '/' : `/${item.toLowerCase()}`;
                    return (
                        <NavLink
                            key={item}
                            to={path}
                            className={({ isActive }) =>
                                `nav-item ${isActive ? 'active' : ''}`
                            }
                        >
                            {item}
                        </NavLink>
                    );
                })}
            </nav>
        </header>
    );
}
