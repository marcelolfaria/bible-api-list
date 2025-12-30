import { useState, useCallback, useEffect, useRef } from 'react';
import './ChapterDetails.css';
import { Loading } from './Loading';
import { ErrorMessage } from './ErrorMessage';

export const ChapterDetails = ({ 
    book, 
    chapter, 
    chapterDetails, 
    loading, 
    error, 
    onBack, 
    onRetry 
}) => {
    const [selectedVerses, setSelectedVerses] = useState(new Set());
    const chapterIdRef = useRef(null);

    // Initialize selected verses when chapter details are loaded
    useEffect(() => {
        const currentChapterId = chapter?.chapter;
        if (chapterDetails?.verses && 
            Array.isArray(chapterDetails.verses) && 
            chapterIdRef.current !== currentChapterId) {
            const allVerses = new Set(chapterDetails.verses.map(v => v.verse));
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedVerses(allVerses);
            chapterIdRef.current = currentChapterId;
        }
    }, [chapterDetails, chapter]);

    const handleVerseToggle = useCallback((verseNumber) => {
        setSelectedVerses(prev => {
            const newSet = new Set(prev);
            if (newSet.has(verseNumber)) {
                newSet.delete(verseNumber);
            } else {
                newSet.add(verseNumber);
            }
            return newSet;
        });
    }, []);

    const handleSelectAll = useCallback(() => {
        if (chapterDetails?.verses && Array.isArray(chapterDetails.verses)) {
            const allVerses = new Set(chapterDetails.verses.map(v => v.verse));
            setSelectedVerses(allVerses);
        }
    }, [chapterDetails]);

    const handleDeselectAll = useCallback(() => {
        setSelectedVerses(new Set());
    }, []);

    const selectedVersesArray = chapterDetails?.verses && Array.isArray(chapterDetails.verses)
        ? chapterDetails.verses.filter(verse => selectedVerses.has(verse.verse))
        : [];

    return (
        <div className="chapter-details-container">
            <button 
                className="back-button" 
                onClick={onBack}
                aria-label={`Voltar para ${book.name}`}
            >
                ← Voltar para {book.name}
            </button>
            
            <h1 className="chapter-title">
                {book.name} - Capítulo {chapter.chapter}
            </h1>
            
            {loading && <Loading message="Carregando versículos..." />}
            
            {error && <ErrorMessage message={error} onRetry={onRetry} />}
            
            {chapterDetails && !loading && !error && (
                <div className="chapter-content">
                    <div className="verses-selection-card">
                        <h2 className="section-title">
                            Selecione os Versículos para Exibir
                            {selectedVerses.size > 0 && (
                                <span className="count-badge">({selectedVerses.size} selecionados)</span>
                            )}
                        </h2>
                        
                        <div className="selection-buttons-group">
                            <button 
                                className="action-button primary" 
                                onClick={handleSelectAll}
                                aria-label="Selecionar todos os versículos"
                            >
                                Selecionar Todos
                            </button>
                            <button 
                                className="action-button secondary" 
                                onClick={handleDeselectAll}
                                aria-label="Desmarcar todos os versículos"
                            >
                                Desmarcar Todos
                            </button>
                        </div>
                        
                        <div className="verses-checkboxes-container">
                            {chapterDetails.verses && Array.isArray(chapterDetails.verses) && 
                                chapterDetails.verses.map((verse) => (
                                    <label 
                                        key={verse.verse} 
                                        className="verse-checkbox-label"
                                        aria-label={`Versículo ${verse.verse}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedVerses.has(verse.verse)}
                                            onChange={() => handleVerseToggle(verse.verse)}
                                            aria-label={`Selecionar versículo ${verse.verse}`}
                                        />
                                        <span className="checkbox-label-text">Versículo {verse.verse}</span>
                                    </label>
                                ))
                            }
                        </div>
                    </div>

                    {selectedVerses.size > 0 && (
                        <div className="verses-quotes-section">
                            <h2 className="section-title">
                                Versículos Selecionados
                                <span className="count-badge">({selectedVerses.size})</span>
                            </h2>
                            <div className="verses-quotes-list">
                                {selectedVersesArray.map((verse) => (
                                    <blockquote key={verse.verse} className="verse-quote">
                                        <p className="verse-text">{verse.text}</p>
                                        <cite className="verse-citation">
                                            {book.name} {chapter.chapter}:{verse.verse}
                                        </cite>
                                    </blockquote>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

