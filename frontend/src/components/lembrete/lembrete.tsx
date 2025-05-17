import { useEffect, useState } from 'react';
import { service } from '../../service/service';
import { FaCirclePlus } from 'react-icons/fa6';
import './lembrete.css';
import ConfirmModal from '../confirmacaoModal/confirmacaoModal';
import AddLembrete from '../addLembrete/addLembrete';

interface Lembrete {
    id: number;
    lembrete: string;
}
export default function Lembrete() {
    const [lembretes, setLembretes] = useState<Lembrete[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [idParaDeletar, setIdParaDeletar] = useState<number>(0);
    const [isAddLembreteOpen, setIsAddLembreteOpen] = useState<boolean>(false);

    const getLembretes = async () => {
        const resultado = await service.listarLembretes();
        setLembretes(resultado);
    }

    const deletarLembrete = async () => {
        await service.deletarLembrete(idParaDeletar);
        setIsModalOpen(false);
        getLembretes();
    }


    useEffect(() => {
        getLembretes();
    }, []);

    return (
        <div className="lembretesContainer">
            {isModalOpen &&
                <ConfirmModal
                    message='Tem certeza que deseja excluir o lembrete?'
                    onCancel={() => {
                        setIsModalOpen(false)
                        setIdParaDeletar(0)
                    }}
                    onConfirm={deletarLembrete} />
            }
            {isAddLembreteOpen &&
                <AddLembrete onAdd={() => {
                    getLembretes();
                    setIsAddLembreteOpen(false);
                }} onClose={() => setIsAddLembreteOpen(false)} />
            }
            <div className='titulo'>
                <h2>Lembretes</h2>
                <button onClick={() => setIsAddLembreteOpen(true)} className='adicionar'>Novo lembrete <FaCirclePlus size={20} color='#fff' /></button>
                <span>Total de lembretes: {lembretes.length}</span>
            </div>

            <div className='lembretes'>
                {lembretes.length > 0 ? (
                    lembretes.sort((a, b) => b.id - a.id).map((item) => (
                        <div key={item.id} className='lembrete'>
                            <p>{'\u25CF ' + item.lembrete + '\n'}</p>
                            <button onClick={() => {
                                setIdParaDeletar(item.id);
                                setIsModalOpen(true);
                            }} className='excluir'>X</button>
                        </div>
                    ))
                ) : (
                    <p style={{ padding: '0 20px' }}>Não há lembretes para mostrar.</p>
                )}
            </div>

        </div>
    )
}