import { useEffect, useState } from 'react';
import { service } from '../../service/service';
import { FaCirclePlus } from 'react-icons/fa6';
import ConfirmModal from '../confirmacaoModal/confirmacaoModal';
// import AddPedido from '../addPedido/addPedido';
import './pedido.css';
import { formatDate } from '../../utils/fomatDate';
import AddPedido from '../addPedido/addPedido';

interface Pedido {
    id: number;
    descricao: string;
    recebido: string;
    prazo: string;
    entregue: string;
    status: any
}
export default function Pedido() {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [idParaDeletar, setIdParaDeletar] = useState<number>(0);
    const [isAddPedidoOpen, setIsAddPedidoOpen] = useState<boolean>(false);

    const deletarPedido = async () => {
        await service.deletarPedido(idParaDeletar);
        setIsModalOpen(false);
        getPedidos();
    }

    const getPedidos = async () => {
        const resultado = await service.listarPedidos();
        setPedidos(resultado);
    }

    useEffect(() => {
        getPedidos();
    }, []);

    return (
        <div className="pedidosContainer">
            {isModalOpen &&
                <ConfirmModal
                    message='Tem certeza que deseja excluir o pedido?'
                    onCancel={() => {
                        setIsModalOpen(false)
                        setIdParaDeletar(0)
                    }}
                    onConfirm={deletarPedido} />
            }
            {isAddPedidoOpen &&
                <AddPedido onAdd={() => {
                    getPedidos();
                    setIsAddPedidoOpen(false);
                }} onClose={() => setIsAddPedidoOpen(false)} />
            }
            <div className='titulo'>
                <h2>Pedidos</h2>
                <button onClick={() => setIsAddPedidoOpen(true)} className='adicionar'>Novo pedido <FaCirclePlus size={20} color='#fff' /></button>
                <span>Total de pedidos: {pedidos.length}</span>
            </div>
            <div className="pedidos">
                {pedidos.length > 0 ? (
                    pedidos.sort((a, b) => {
                        const dateA = new Date(a.prazo);
                        const dateB = new Date(b.prazo);
                        return dateA.getTime() - dateB.getTime();
                    }).map((item) => (
                        <div key={item.id} className="pedido">
                            <p>{`\u25CF ${item.descricao}`}</p>
                            <p>Recebido em: {formatDate.toBrazilianDate(item.recebido)}</p>
                            <p>Prazo de entrega: {formatDate.toBrazilianDate(item.prazo)}</p>
                            <span></span>
                            <button onClick={() => {
                                setIdParaDeletar(item.id);
                                setIsModalOpen(true);
                            }} className="excluir">X</button>
                        </div>
                    ))
                ) : (
                    <p style={{ padding: '0 20px' }}>Não há pedidos para mostrar.</p>
                )}
            </div>

        </div>
    )
}