'use client';

import { useState } from 'react';
import AuthButton from '../components/AuthButton';
import NoteList from '../components/NoteList';
import NoteEditor from '../components/NoteEditor';
import { createNote } from '../services/createNote';
import { useAuth } from '../hooks/useAuth';

interface Note {
  id: string;
  title: string;
  body: string;
}

export default function Home() {
  const { user } = useAuth();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNewNote = async () => {
    if (!user) return;
    const docRef = await createNote(user.uid);
    setSelectedNote({ id: docRef.id, title: 'Untitled', body: '' });
  };

  const handleSave = () => {
    
  };

  return (
    <div>
      <AuthButton />
      {user && (
        <>
          <button onClick={handleNewNote}>New Note</button>
          <NoteList onSelectNote={setSelectedNote} />
          {selectedNote && <NoteEditor note={selectedNote} onSave={handleSave} />}
        </>
      )}
    </div>
  );
}
