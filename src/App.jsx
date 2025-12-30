// Chame uma api publica
// Liste os items dessa api publica
// Trate os possiveis erros e exiba pro usuario que algo ocorreu de errado


import { useEffect, useState } from 'react';
import './App.css'

function App() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [bookDetails, setBookDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [booksError, setBooksError] = useState(null);

    const loadBooks = async () => {
        try {
            setBooksError(null);
            const response = await fetch("https://bible-api.com/data/web");
            if (!response.ok) {
                throw new Error('Erro ao carregar os livros');
            }
            const data = await response.json();
            setBooks(data.books);
        } catch (err) {
            setBooksError('Ocorreu um erro ao carregar a lista de livros. Por favor, tente novamente.');
            console.error(err);
        }
    };

    const loadBookDetails = async (bookUrl) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(bookUrl);
            if (!response.ok) {
                throw new Error('Erro ao carregar os detalhes do livro');
            }
            const data = await response.json();
            setBookDetails(data);
            console.log(data)
        } catch (err) {
            setError('Ocorreu um erro ao carregar os detalhes do livro. Por favor, tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBookClick = (book) => {
        setSelectedBook(book);
        loadBookDetails(book.url);
    };

    const handleBackClick = () => {
        setSelectedBook(null);
        setBookDetails(null);
        setError(null);
    };

    useEffect(() => {
        loadBooks();
    }, [])

    // Página de detalhes do livro
    if (selectedBook) {
        return (
            <div className='book-details'>
                <button className='back-button' onClick={handleBackClick}>
                    ← Voltar para a lista
                </button>
                
                <h1>{selectedBook.name}</h1>
                
                {loading && <p className='loading'>Carregando capítulos...</p>}
                
                {error && (
                    <div className='error-message'>
                        <p>{error}</p>
                        <button onClick={() => loadBookDetails(selectedBook.url)}>
                            Tentar novamente
                        </button>
                    </div>
                )}
                
                {bookDetails && !loading && !error && (
                    <div className='book-info'>
                        <div className='translation-info'>
                            <h2>Informações da Tradução</h2>
                            <p><strong>Nome:</strong> {bookDetails.translation.name}</p>
                            <p><strong>Idioma:</strong> {bookDetails.translation.language}</p>
                            <p><strong>Código do Idioma:</strong> {bookDetails.translation.language_code}</p>
                            <p><strong>Licença:</strong> {bookDetails.translation.license}</p>
                        </div>
                        
                        <div className='chapters-section'>
                            <h2>Capítulos ({bookDetails.chapters.length})</h2>
                            <ul className='chapters-list'>
                                {bookDetails.chapters.map((chapter) => (
                                    <li key={chapter.chapter} className='chapter-item'>
                                        <span className='chapter-number'>Capítulo {chapter.chapter}</span>
                                        <a 
                                            href={chapter.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className='chapter-link'
                                        >
                                            Ver conteúdo →
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Página de lista de livros
    return (
        <div className='books-list'>
            <h1>Livros da Bíblia</h1>
            
            {booksError && (
                <div className='error-message'>
                    <p>{booksError}</p>
                    <button onClick={loadBooks}>Tentar novamente</button>
                </div>
            )}
            
            {!booksError && (
                <ul>
                    {books.map((book) => (
                        <li key={book.id} onClick={() => handleBookClick(book)} className='book-item'>
                            <span className='book-name'>{book.name}</span>
                            <span className='book-arrow'>→</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default App