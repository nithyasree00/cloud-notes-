
import { db } from '../lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
export async function createNote(uid: string) {
return addDoc(collection(db, `users/${uid}/notes`), {
title: 'Untitled', body: '', tags: [], shared: false,
createdAt: serverTimestamp(), updatedAt: serverTimestamp()
});
}