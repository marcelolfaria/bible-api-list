import './BooksList.css';
import { ErrorMessage } from './ErrorMessage';
import { Loading } from './Loading';

export const BooksList = ({ books, onBookClick, error, loading, onRetry }) => {
    return (
        <div className="books-list-container">
            <h1 className="page-title">Livros da Bíblia</h1>
            
            {loading && <Loading message="Carregando livros..." />}
            
            {error && <ErrorMessage message={error} onRetry={onRetry} />}
            
            {!loading && !error && (
                <div className="books-grid">
                    {books.map((book) => (
                        <button
                            key={book.id}
                            onClick={() => onBookClick(book)}
                            className="book-card"
                            aria-label={`Ver detalhes de ${book.name}`}
                        >
                            <span className="book-name">{book.name}</span>
                            <span className="book-arrow" aria-hidden="true">→</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

