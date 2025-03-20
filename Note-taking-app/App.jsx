// src/App.js
import React, { useState, useEffect } from 'react';

function App() {
    const [notes, setNotes] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(storedNotes);
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const handleAddNote = () => {
        if (inputValue.trim() === '') return;
        if (editIndex !== null) {
            const updatedNotes = notes.map((note, index) => 
                index === editIndex ? inputValue : note
            );
            setNotes(updatedNotes);
            setEditIndex(null);
        } else {
            setNotes([...notes, inputValue]);
        }
        setInputValue('');
    };

    const handleEditNote = (index) => {
        setInputValue(notes[index]);
        setEditIndex(index);
    };

    const handleDeleteNote = (index) => {
        const updatedNotes = notes.filter((_, i) => i !== index);
        setNotes(updatedNotes);
    };

    return (
        <div>
            <h1>Note-Taking App</h1>
            <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
            />
            <button onClick={handleAddNote}>
                {editIndex !== null ? 'Update Note' : 'Add Note'}
            </button>
            <ul>
                {notes.map((note, index) => (
                    <li key={index}>
                        {note}
                        <button onClick={() => handleEditNote(index)}>Edit</button>
                        <button onClick={() => handleDeleteNote(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;