import { useEffect, useState } from 'react';
import { watchNotes } from '../services/listNotes';
import { useAuth } from '../hooks/useAuth';

interface Note {
  id: string;
  title: string;
  body: string;
}

interface NoteListProps {
  onSelectNote: (note: Note) => void;
}

export default function NoteList({ onSelectNote }: NoteListProps) {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = watchNotes(user.uid, setNotes);
    return unsubscribe;
  }, [user]);

  return (
    <div>
      {notes.map((note) => (
        <div key={note.id} onClick={() => onSelectNote(note)}>
          <h3>{note.title}</h3>
          <p>{note.body.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}
