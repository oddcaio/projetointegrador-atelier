import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { service } from '../../service/service';
import './contatos.css';

interface Contato {
    id: number;
    nome: string;
    telefone: string;
    tipo: 'costureira' | 'fornecedor';
}

export default function Contatos() {
    const [costureiras, setCostureiras] = useState<Contato[]>([]);
    const [fornecedores, setFornecedores] = useState<Contato[]>([]);

    async function getContatos() {
        try {
            const result: Contato[] = await service.listarContatos();
            setCostureiras(result.filter(c => c.tipo === 'costureira'));
            setFornecedores(result.filter(c => c.tipo === 'fornecedor'));
        } catch (error) {
            console.error('Erro ao carregar contatos:', error);
        }
    }

    useEffect(() => {
        getContatos();
    }, []);

    return (
        <div className="containerContatos">
            <div className="coluna">
                <h2>Costureiras:</h2>
                {costureiras.length > 0 ? (
                    costureiras.map((contato) => (
                        <div key={contato.id} className="linha">
                            <span className="nome">{contato.nome}</span>
                            <a
                                href={`https://wa.me/${contato.telefone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="whatsapp"
                            >
                                <FaWhatsapp className="whatsapp-icon" />
                            </a>
                        </div>
                    ))
                ) : (
                    <p>Nenhuma costureira cadastrada.</p>
                )}
            </div>

            <div className="coluna">
                <h2>Fornecedores:</h2>
                {fornecedores.length > 0 ? (
                    fornecedores.map((contato) => (
                        <div key={contato.id} className="linha">
                            <span className="nome">{contato.nome}</span>
                            <a
                                href={`https://wa.me/${contato.telefone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="whatsapp"
                            >
                                <FaWhatsapp className="whatsapp-icon" />
                            </a>
                        </div>
                    ))
                ) : (
                    <p>Nenhum fornecedor cadastrado.</p>
                )}
            </div>
        </div>
    );
}
