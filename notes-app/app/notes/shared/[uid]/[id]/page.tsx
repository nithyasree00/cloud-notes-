'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../../lib/firebase';
import ReactMarkdown from 'react-markdown';

interface SharedNote {
  title: string;
  body: string;
  shareExpiresAt?: any;
  shared?: boolean;
}

interface SharedNotePageProps {
  params: { uid: string; id: string };
}

export default function SharedNotePage({ params }: SharedNotePageProps) {
  const { uid, id } = params;
  const [note, setNote] = useState<SharedNote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      const docRef = doc(db, `users/${uid}/notes/${id}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as SharedNote;
        const now = new Date();

        if (data.shared && data.shareExpiresAt?.toDate() > now) {
          setNote(data);
        } else {
          setNote(null); // Not shared or expired
        }
      } else {
        setNote(null); // Note not found
      }
      setLoading(false);
    };

    fetchNote();
  }, [uid, id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!note)
    return <div className="p-6 text-red-500">Note not found or expired.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
      <div className="prose">
        <ReactMarkdown>{note.body}</ReactMarkdown>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Expires at: {note.shareExpiresAt?.toDate().toLocaleString()}
      </p>
    </div>
  );
}
