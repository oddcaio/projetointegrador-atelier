import Lembrete from '../../components/lembrete/lembrete';
import Pedido from '../../components/pedido/pedido';
import './inicio.css';

export default function Inicio() {
    return (
        <main className='containerInicio'>
            <Lembrete />
            <Pedido />
        </main>
    )
}