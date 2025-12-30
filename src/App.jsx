import { useEffect, useState, useCallback } from 'react';
import './App.css';
import { useBooks, useBookDetails, useChapterDetails } from './hooks/useBibleApi';
import { BooksList } from './components/BooksList';
import { BookDetails } from './components/BookDetails';
import { ChapterDetails } from './components/ChapterDetails';

function App() {
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);

    const { books, error: booksError, loading: booksLoading, loadBooks } = useBooks();
    const { 
        bookDetails, 
        error: bookError, 
        loading: bookLoading, 
        loadBookDetails, 
        reset: resetBookDetails 
    } = useBookDetails();
    const { 
        chapterDetails, 
        error: chapterError, 
        loading: chapterLoading, 
        loadChapterDetails, 
        reset: resetChapterDetails 
    } = useChapterDetails();

    const handleBookClick = useCallback((book) => {
        setSelectedBook(book);
        setSelectedChapter(null);
        resetChapterDetails();
        loadBookDetails(book.url);
    }, [loadBookDetails, resetChapterDetails]);

    const handleChapterClick = useCallback((chapter) => {
        setSelectedChapter(chapter);
        loadChapterDetails(chapter.url);
    }, [loadChapterDetails]);

    const handleBackToBooks = useCallback(() => {
        setSelectedBook(null);
        setSelectedChapter(null);
        resetBookDetails();
        resetChapterDetails();
    }, [resetBookDetails, resetChapterDetails]);

    const handleBackToBook = useCallback(() => {
        setSelectedChapter(null);
        resetChapterDetails();
    }, [resetChapterDetails]);

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);

    // Render chapter details page
    if (selectedChapter && selectedBook) {
        return (
            <ChapterDetails
                book={selectedBook}
                chapter={selectedChapter}
                chapterDetails={chapterDetails}
                loading={chapterLoading}
                error={chapterError}
                onBack={handleBackToBook}
                onRetry={() => loadChapterDetails(selectedChapter.url)}
            />
        );
    }

    // Render book details page
    if (selectedBook) {
        return (
            <BookDetails
                book={selectedBook}
                bookDetails={bookDetails}
                loading={bookLoading}
                error={bookError}
                onBack={handleBackToBooks}
                onChapterClick={handleChapterClick}
                onRetry={() => loadBookDetails(selectedBook.url)}
            />
        );
    }

    // Render books list page
    return (
        <BooksList
            books={books}
            onBookClick={handleBookClick}
            error={booksError}
            loading={booksLoading}
            onRetry={loadBooks}
        />
    );
}

export default App;
