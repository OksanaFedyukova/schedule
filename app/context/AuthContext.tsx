import React, { createContext, useContext, useState, useEffect } from 'react';
import Loader from "../components/Loader";
import { onAuthStateChanged, getAuth, signOut, Auth } from 'firebase/auth';
import firebase_app from '@/firebase/config';

interface User {
  uid: string;
  email: string | null;
  password: string | null;
}

interface AuthContextType {
  user: User | null;
  handleSignOut: () => void;
}

const auth: Auth = getAuth(firebase_app);

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  handleSignOut: () => {},
});

export const useAuthContext = (): AuthContextType => useContext(AuthContext);

export const AuthContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ uid: user.uid, email: user.email, password: user.password });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, handleSignOut }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
