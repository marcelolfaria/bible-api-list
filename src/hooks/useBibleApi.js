import { useState, useCallback } from 'react';

const API_BASE = 'https://bible-api.com';

export const useBooks = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadBooks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_BASE}/data/web`);
            if (!response.ok) {
                throw new Error('Erro ao carregar os livros');
            }
            const data = await response.json();
            setBooks(data.books || []);
        } catch (err) {
            setError('Ocorreu um erro ao carregar a lista de livros. Por favor, tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return { books, error, loading, loadBooks };
};

export const useBookDetails = () => {
    const [bookDetails, setBookDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadBookDetails = useCallback(async (bookUrl) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(bookUrl);
            if (!response.ok) {
                throw new Error('Erro ao carregar os detalhes do livro');
            }
            const data = await response.json();
            setBookDetails(data);
        } catch (err) {
            setError('Ocorreu um erro ao carregar os detalhes do livro. Por favor, tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setBookDetails(null);
        setError(null);
        setLoading(false);
    }, []);

    return { bookDetails, error, loading, loadBookDetails, reset };
};

export const useChapterDetails = () => {
    const [chapterDetails, setChapterDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadChapterDetails = useCallback(async (chapterUrl) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(chapterUrl);
            if (!response.ok) {
                throw new Error('Erro ao carregar os versículos do capítulo');
            }
            const data = await response.json();
            setChapterDetails(data);
        } catch (err) {
            setError('Ocorreu um erro ao carregar os versículos do capítulo. Por favor, tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setChapterDetails(null);
        setError(null);
        setLoading(false);
    }, []);

    return { chapterDetails, error, loading, loadChapterDetails, reset };
};

