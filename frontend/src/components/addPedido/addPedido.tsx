import { useState, useEffect, type FormEvent } from 'react';
import { service } from '../../service/service';
import './addPedido.css';

interface AddPedidoProps {
    onClose: () => void;
    onAdd: () => void;
}

export default function AddPedido({ onClose, onAdd }: AddPedidoProps) {
    const [descricao, setDescricao] = useState<string>('');
    const [recebido, setRecebido] = useState<string | undefined>(undefined);
    const [prazo, setPrazo] = useState<string | undefined>(undefined);
    const [entregue, setEntregue] = useState<string | null>(null);
    const [status, setStatus] = useState<{ id: number; nome: string } | null>(null);
    const [statusOptions, setStatusOptions] = useState<{ id: number; nome: string }[]>([]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!recebido || !prazo || !status) return; // segurança extra
        const novoPedido = {
            descricao,
            recebido,
            prazo,
            entregue,
            status,
        };
        await service.novoPedido(novoPedido);
        setDescricao('');
        setRecebido(undefined);
        setPrazo(undefined);
        setEntregue(null);
        setStatus(statusOptions.length > 0 ? statusOptions[0] : null);
        onAdd();
    };

    const isEmpty =
        descricao.trim().length <= 10 ||
        descricao.trim().length > 255 ||
        !recebido ||
        !prazo ||
        !status;
    const getStatusOptions = async () => {
        try {
            const statusList = await service.listarStatus();
            setStatusOptions(statusList);
            if (statusList.length > 0 && !status) {
                setStatus(statusList[0]);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getStatusOptions();
    }, []);
    return (
        <div className="overlay">
            <div className="addPedido">
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                        placeholder="Descrição do pedido"
                        autoFocus
                    />
                    <div className="input-container">
                        <label htmlFor="recebido" className="input-label">Data de recebimento</label>
                        <input
                            id="recebido"
                            type="date"
                            value={recebido ?? ''}
                            onChange={e => setRecebido(e.target.value || undefined)}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="prazo" className="input-label">Prazo de entrega</label>
                        <input
                            id="prazo"
                            type="date"
                            value={prazo ?? ''}
                            onChange={e => setPrazo(e.target.value || undefined)}
                        />
                    </div>
                    <select
                        value={status?.id ?? ''}
                        onChange={e => {
                            const selected = statusOptions.find(opt => opt.id === Number(e.target.value));
                            setStatus(selected ?? null);
                        }}
                    >
                        {statusOptions.length > 0 ? (
                            statusOptions.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.nome}
                                </option>
                            ))
                        ) : (
                            <option value="">Carregando status...</option>
                        )}
                    </select>

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
