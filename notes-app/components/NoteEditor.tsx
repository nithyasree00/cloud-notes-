'use client';

import { useState, useEffect } from 'react';
import { updateNote } from '../services/updateNote';
import { auth } from '../lib/firebase';

interface Note {
  id: string;
  title: string;
  body: string;
  shared?: boolean;
  shareExpiresAt?: any;
}

interface NoteEditorProps {
  note: Note;
  onSave: () => void;
}

export default function NoteEditor({ note, onSave }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [shared, setShared] = useState(note.shared || false);
  const [expiresAt, setExpiresAt] = useState(
    note.shareExpiresAt
      ? new Date(note.shareExpiresAt.toDate()).toISOString().slice(0, 16)
      : ''
  );

  useEffect(() => {
    setTitle(note.title);
    setBody(note.body);
    setShared(note.shared || false);
    setExpiresAt(
      note.shareExpiresAt
        ? new Date(note.shareExpiresAt.toDate()).toISOString().slice(0, 16)
        : ''
    );
  }, [note]);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('Please sign in first');
      return;
    }

    await updateNote(user.uid, note.id, {
      title,
      body,
      shared,
      expiresAt: shared ? expiresAt : null
    });

    onSave();
    alert('Note saved!');
  };

  const handleCopyLink = () => {
    const user = auth.currentUser;
    if (!user) {
      alert('Please sign in first');
      return;
    }

    if (!shared) {
      alert('Enable sharing first!');
      return;
    }

    const shareLink = `${window.location.origin}/notes/shared/${user.uid}/${note.id}`;
    navigator.clipboard.writeText(shareLink);
    alert('Share link copied!');
  };

  return (
    <div className="p-4 border rounded space-y-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        className="w-full p-2 border rounded"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Note Body"
        className="w-full p-2 border rounded h-40"
      />

      <div className="flex items-center space-x-2">
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={shared}
            onChange={(e) => setShared(e.target.checked)}
          />
          <span>Share publicly</span>
        </label>

        {shared && (
          <input
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="p-1 border rounded"
          />
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleSave}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Save
        </button>
        {shared && (
          <button
            onClick={handleCopyLink}
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            Copy Share Link
          </button>
        )}
      </div>
    </div>
  );
}
