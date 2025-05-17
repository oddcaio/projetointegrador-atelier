import { useState, type FormEvent } from 'react';
import './addLembrete.css';
import { service } from '../../service/service';

interface AddLembreteProps {
    onClose: () => void;
    onAdd: () => void;
}

export default function AddLembrete({ onClose, onAdd }: AddLembreteProps) {
    const [lembrete, setLembrete] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await service.novoLembrete(lembrete.trim())
        setLembrete('');
        onAdd();
    };

    const isEmpty = lembrete.trim().length <= 10 || lembrete.trim().length > 255;

    return (
        <div className="overlay">
            <div className="addLembrete">
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={lembrete}
                        onChange={e => setLembrete(e.target.value)}
                        placeholder="Digite seu lembrete"
                        autoFocus
                    />
                    <div className="buttons">
                        <button type="button" onClick={onClose} className="cancel-button">
                            Cancelar
                        </button>
                        <button type="submit" className="confirm-button" disabled={isEmpty}>
                            Adicionar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
