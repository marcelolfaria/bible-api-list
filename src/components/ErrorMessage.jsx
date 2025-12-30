import './ErrorMessage.css';

export const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="error-message" role="alert">
            <div className="error-icon">⚠️</div>
            <p className="error-text">{message}</p>
            {onRetry && (
                <button className="error-retry-button" onClick={onRetry}>
                    Tentar novamente
                </button>
            )}
        </div>
    );
};

