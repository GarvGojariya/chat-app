import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc, getDocs, query, setDoc, doc, } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";


// create context
const AppContext = createContext(null)
// firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAMWxoiPFYCro3yw1OBA5rliDvlj6uut1E",
    authDomain: "groupchatapp-b8a97.firebaseapp.com",
    projectId: "groupchatapp-b8a97",
    storageBucket: "groupchatapp-b8a97.appspot.com",
    messagingSenderId: "664962031409",
    appId: "1:664962031409:web:86a0f666444e34de235a10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage()

export const useFirebase = () => useContext(AppContext)

// create provider

export const AppProvider = (props) => {
    const [user, setUser] = useState('')
    const navigate = useNavigate()
    //firebase authentication 
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, []);
    const isLoggedIn = user ? true : false;
    const registerWithEmailAndPassword = async (email, password, name, image) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            const date = new Date().getTime();
            const storageref = ref(storage, `${name + date}`);
            const snapshot = await uploadBytesResumable(storageref, image);
            const downloadUrl = await getDownloadURL(snapshot.ref);
            await updateProfile(userCredential.user, {
                displayName: name,
                photoURL: downloadUrl
            });
            await setDoc(doc(firestore, "person", userCredential.user.uid), {
                uid: userCredential.user.uid,
                name,
                email: userCredential.user.email,
                photoURL: downloadUrl,
            });
            await setDoc(doc(firestore, "userChats", userCredential.user.uid), {});
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    console.log(user)

    const loginWithEmailAndPassword = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
    }
    const logOut = () => {
        signOut(firebaseAuth);
        navigate("/login")
    }

    return (
        <AppContext.Provider value={{ registerWithEmailAndPassword, loginWithEmailAndPassword, logOut, isLoggedIn, user }}>
            {props.children}
        </AppContext.Provider>
    );
}