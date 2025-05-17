import './notFound.css';
import robo from '../../assets/robo.png';

export default function NotFound() {
    return (
        <div className='notFound'>
            <h1>
                Página não encontrada!
            </h1>
            <img src={robo} width={320} />
        </div>
    )
}