import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';

export default function AuthButton() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user) {
    return (
      <div>
        <p>Welcome, {user.displayName}!</p>
        <button onClick={() => signOut(auth)}>Sign Out</button>
      </div>
    );
  }

  return (
    <button onClick={() => signInWithPopup(auth, provider)}>
      Sign In with Google
    </button>
  );
}
