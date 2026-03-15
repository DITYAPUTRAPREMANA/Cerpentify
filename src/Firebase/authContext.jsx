/* eslint-disable no-useless-catch */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect }
from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile,
    updatePassword
}
from 'firebase/auth';
import { 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc 
}
from 'firebase/firestore';
import { auth, db } from '../Firebase/firebase';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

  // Register function
    const signup = async (email, password, username) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update user profile with username
        await updateProfile(user, {
            displayName: username
        });

        // Save user data to Firestore tanpa 'fullName' dan menambahkan liked_cn dan cerpenku sebagai array kosong
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: email,
            username: username,
            liked_cn: [], // array kosong
            cerpenku: [], // array kosong
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

            return user;
        } catch (error) {
            throw error;
        }
    };

  // Login function
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

  // Logout function
    const logout = () => {
        return signOut(auth);
    };

  // Get user profile from Firestore
    const getUserProfile = async (uid) => {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            return userDoc.data();
        }
        return null;
    } catch (error) {
        console.error('Error getting user profile:', error);
        return null;
        }
    };

  // Update user profile in Firestore
    const updateUserProfile = async (uid, profileData) => {
        try {
        await updateDoc(doc(db, 'users', uid), {
            ...profileData,
            updatedAt: new Date().toISOString()
        });
    
      // Update local state
    setUserProfile(prev => ({ ...prev, ...profileData }));
    
    return true;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
        }
    };

  // Update password
const updateUserPassword = async (newPassword) => {
    try {
    await updatePassword(currentUser, newPassword);
    return true;
    } catch (error) {
    console.error('Error updating password:', error);
    throw error;
    }
};

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
    setCurrentUser(user);
    
    if (user) {
        // Get user profile from Firestore
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
    } else {
        setUserProfile(null);
    }
    
    setLoading(false);
    });

    return unsubscribe;
}, []);

const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    updateUserProfile,
    updateUserPassword
};

return (
    <AuthContext.Provider value={value}>
    {!loading && children}
    </AuthContext.Provider>
    );
};