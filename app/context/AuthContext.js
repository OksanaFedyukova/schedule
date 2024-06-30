import React from 'react';
import Loader from "../components/Loader";

import {
    onAuthStateChanged,
    getAuth,
    signOut 
} from 'firebase/auth';
import firebase_app from '@/firebase/config';

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            setUser(null); 
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    };

    return (
        <AuthContext.Provider value={{ user, handleSignOut }}>
            {loading ? <Loader /> : children}
        </AuthContext.Provider>
    );
};
