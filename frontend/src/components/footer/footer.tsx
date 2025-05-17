import './footer.css';

export default function Footer() {
    const date = new Date()
    return (
        <footer className="footer">
            <p>© {date.getFullYear()} Atelier Opção. Todos os direitos reservados.</p>
        </footer>
    )
}


