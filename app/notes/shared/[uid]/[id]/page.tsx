import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";

interface SharedNotePageProps {
  params: { uid: string; id: string };
}

export default async function SharedNotePage({ params }: SharedNotePageProps) {
  const { uid, id } = params;

  try {
    const docRef = doc(db, `users/${uid}/notes/${id}`);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return <div>Note not found</div>;
    }

    const note = docSnap.data();

    return (
      <div>
        <h1>{note.title}</h1>
        <p>{note.body}</p>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Error loading note</div>;
  }
}
