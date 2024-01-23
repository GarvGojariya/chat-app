import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs, query, setDoc, doc, where, serverTimestamp, getDoc, updateDoc, arrayUnion, Timestamp, } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import { v4 as uuid } from "uuid";

// create context
const AppContext = createContext(null)
// firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAD1Z5F8MIo7sRMlgBcAdfT2rwwuGDTe9A",
    authDomain: "chat-app-ceeb5.firebaseapp.com",
    projectId: "chat-app-ceeb5",
    storageBucket: "chat-app-ceeb5.appspot.com",
    messagingSenderId: "664589819626",
    appId: "1:664589819626:web:a1dffdfe03ea1b8aee8193"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app)
const firestore = getFirestore()
const storage = getStorage()

export const useFirebase = () => useContext(AppContext)

// create provider

export const AppProvider = (props) => {

    const [chatUser, setChatUser] = useState(null)
    const [currentUser, setCurrentUser] = useState('')
    const [contextData, setContextData] = useState({ chatId: '', user: {} })
    const navigate = useNavigate()
    //firebase authentication 
    useEffect(() => {
        const unsub = onAuthStateChanged(firebaseAuth, (user) => {
            setCurrentUser(user);
        });
        // console.log(currentUser)
        return () => {
            unsub();
        };
    }, [currentUser]);
    const isLoggedIn = currentUser ? true : false;
    const registerWithEmailAndPassword = async (email, password, displayName, image) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            const date = new Date().getTime();
            const storageref = ref(storage, `${displayName + date}`);
            await uploadBytesResumable(storageref, image).then(async () => {
                const downloadUrl = await getDownloadURL(storageref);
                await updateProfile(userCredential.user, {
                    displayName: displayName,
                    photoURL: downloadUrl
                });
                await setDoc(doc(firestore, "person", userCredential.user.uid), {
                    uid: userCredential.user.uid,
                    displayName,
                    email: userCredential.user.email,
                    photoURL: downloadUrl,
                });
                await setDoc(doc(firestore, "userChats", userCredential.user.displayName), {});
            })
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };
    const loginWithEmailAndPassword = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
    }
    const logOut = () => {
        signOut(firebaseAuth);
        navigate("/login")
    }
    const findUser = async (userName) => {
        const q = query(collection(firestore, 'person'), where("displayName", "==", userName));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setChatUser(doc.data());
                return chatUser
            });
        } catch (err) {
            console.log('error')
        }
    }
    const selectUser = async () => {
        const combinedId =
            currentUser.uid > chatUser.uid
                ? currentUser.uid + chatUser.uid
                : chatUser.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(firestore, "chats", combinedId));
            if (!res.exists()) {
                // Create a chat in the "chats" collection
                await setDoc(doc(firestore, "chats", combinedId), { messages: [] });
                // Update "userChats" for the current user
                await updateDoc(doc(firestore, "userChats", currentUser.displayName), {
                    [combinedId + ".userInfo"]: {
                        uid: chatUser.uid,
                        displayName: chatUser.displayName,
                        photoURL: chatUser.photoURL,
                    }
                });
                // Update "userChats" for the other user
                await updateDoc(doc(firestore, "userChats", chatUser.displayName), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    }
                });
            }
        } catch (error) {
            console.error("Error during chat creation:", error);
        }
    };
    const getChats = async () => {
        const id = currentUser.displayName
        try {
            const snapshot = await getDoc(doc(firestore, 'userChats', id));
            const chatsData = snapshot.data()
            return chatsData || [];
        } catch (error) {
            console.error('Error getting chats:', error);
            return [];
        }
    };
    // console.log(data)
    const sendMessage = async (message) => {
        await updateDoc(doc(firestore, "chats", contextData.chatId), {
            messages: arrayUnion({
                id: uuid(),
                message,
                senderId: currentUser.uid,
                date: Timestamp.now(),
            }),
        });
        await updateDoc(doc(firestore, "userChats", currentUser.displayName), {
            [contextData.chatId + ".lastMessage"]: {
                message,
            },
            [contextData.chatId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(firestore, "userChats", contextData.user.displayName), {
            [contextData.chatId + ".lastMessage"]: {
                message,
            },
            [contextData.chatId + ".date"]: serverTimestamp(),
        });
    }

    const handleUserChange = (userInfo) => {
        const chatId =
            currentUser && currentUser.uid > userInfo.uid
                ? currentUser.uid + userInfo.uid
                : userInfo.uid + (currentUser ? currentUser.uid : '');
        const data = {
            user: userInfo,
            chatId,
        };
        setContextData(data);
    };
    const getMessage = async () => {
        try {
            if (!contextData.chatId) {
                return [];
            }
            const snapshot = await getDoc(doc(firestore, 'chats', contextData.chatId));
            const messageData = snapshot.data();
            return messageData || [];
        } catch (error) {
            console.error('Error getting messages:', error);
            return [];
        }
    }
    return (
        <AppContext.Provider value={{ registerWithEmailAndPassword, getMessage, contextData, handleUserChange, sendMessage, getChats, chatUser, findUser, selectUser, loginWithEmailAndPassword, logOut, isLoggedIn, currentUser }}>
            {props.children}
        </AppContext.Provider>
    );
}