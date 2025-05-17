import './confirmacaoModal.css';

interface ConfirmModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({ message, onConfirm, onCancel }: ConfirmModalProps) {
    return (
        <div className="overlay">
            <div className="confirmacaoModal">
                <p>{message}</p>
                <div className="buttons">
                    <button onClick={onCancel} className="cancel-button">
                        Cancelar
                    </button>
                    <button onClick={onConfirm} className="confirm-button">
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

