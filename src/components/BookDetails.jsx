import './BookDetails.css';
import { Loading } from './Loading';
import { ErrorMessage } from './ErrorMessage';

export const BookDetails = ({ 
    book, 
    bookDetails, 
    loading, 
    error, 
    onBack, 
    onChapterClick, 
    onRetry 
}) => {
    return (
        <div className="book-details-container">
            <button 
                className="back-button" 
                onClick={onBack}
                aria-label="Voltar para a lista de livros"
            >
                ← Voltar para a lista
            </button>
            
            <h1 className="book-title">{book.name}</h1>
            
            {loading && <Loading message="Carregando capítulos..." />}
            
            {error && <ErrorMessage message={error} onRetry={onRetry} />}
            
            {bookDetails && !loading && !error && (
                <div className="book-content">
                    <div className="translation-info-card">
                        <h2 className="section-title">Informações da Tradução</h2>
                        <div className="info-grid">
                            <div className="info-item">
                                <strong>Nome:</strong>
                                <span>{bookDetails.translation.name}</span>
                            </div>
                            <div className="info-item">
                                <strong>Idioma:</strong>
                                <span>{bookDetails.translation.language}</span>
                            </div>
                            <div className="info-item">
                                <strong>Código do Idioma:</strong>
                                <span>{bookDetails.translation.language_code}</span>
                            </div>
                            <div className="info-item">
                                <strong>Licença:</strong>
                                <span>{bookDetails.translation.license}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="chapters-section">
                        <h2 className="section-title">
                            Capítulos <span className="count-badge">({bookDetails.chapters.length})</span>
                        </h2>
                        <div className="chapters-grid">
                            {bookDetails.chapters.map((chapter) => (
                                <button
                                    key={chapter.chapter}
                                    className="chapter-card"
                                    onClick={() => onChapterClick(chapter)}
                                    aria-label={`Ver capítulo ${chapter.chapter} de ${book.name}`}
                                >
                                    <span className="chapter-number">Capítulo {chapter.chapter}</span>
                                    <span className="chapter-arrow" aria-hidden="true">→</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

