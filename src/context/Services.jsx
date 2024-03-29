import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs, query, setDoc, doc, where, serverTimestamp, getDoc, updateDoc, arrayUnion, Timestamp, onSnapshot, } from "firebase/firestore";
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
    const [groupData, setGroupData] = useState([])
    const [count, setCount] = useState(0)
    const [contextData, setContextData] = useState({ chatId: '', user: {} })
    const navigate = useNavigate()
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

            // Generate a unique filename for the image
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName}_${date}`);

            // Upload image to Firebase Storage
            await uploadBytesResumable(storageRef, image);

            // Get download URL of the uploaded image
            const downloadUrl = await getDownloadURL(storageRef);

            // Update user profile with displayName and photoURL
            await updateProfile(userCredential.user, {
                displayName: displayName,
                photoURL: downloadUrl
            });

            // Set user details in Firestore under "person" collection
            await setDoc(doc(firestore, "person", userCredential.user.uid), {
                uid: userCredential.user.uid,
                displayName,
                email: userCredential.user.email,
                photoURL: downloadUrl,
            });

            // Set initial documents in Firestore under "userGroups" and "userChats" collections
            await setDoc(doc(firestore, "userGroups", userCredential.user.displayName), {});
            await setDoc(doc(firestore, "userChats", userCredential.user.displayName), {});
        } catch (error) {
            console.error("Error during registration:", error);
            // Handle specific errors and provide user-friendly messages
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
    const getChats = (callback) => {
        const id = currentUser.displayName;
        try {
            const q = query(doc(firestore, 'userChats', id));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const chatsData = snapshot.data();
                console.log(chatsData)
                callback(chatsData);
            });
            return unsubscribe;
        } catch (error) {
            console.error('Error getting chats:', error);
            return () => { };
        }
    };
    // const updateUnread = async() => {
    //     const id =
    //         currentUser && currentUser.uid > userInfo.uid
    //             ? currentUser.uid + userInfo.uid
    //        try {
    //         if (id === contextData.chatId) {
    //             await updateDoc()
    //         } else {

    //         }
    //     } catch (error) {

    //     }
    // }
    const getUnreadCount = () => {
        try {
            const docRef = doc(firestore, 'userChats', contextData.user.displayName);
            // Subscribe to real-time updates using onSnapshot
            const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const fieldValue = docSnapshot.data()[contextData.chatId];
                    const countData = fieldValue?.unreadcount || { count: 0 };
                    const unreadCount = countData.count;
                    console.log(unreadCount);
                    setCount(unreadCount + 1);
                } else {
                    console.log('Document does not exist');
                }
            });
            return unsubscribe;
        } catch (error) {
            console.error('Error getting document:', error);
            return () => { }; // Return an empty function if there's an error
        }
    };
    const sendMessage = async (message) => {
        getUnreadCount();
        await updateDoc(doc(firestore, "chats", contextData.chatId), {
            messages: arrayUnion({
                id: uuid(),
                message,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                read: false
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
            [contextData.chatId + ".unreadcount"]: {
                count,
            }
        });
        setCount(0)
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
    const updateUnread = async () => {
        if (!contextData.chatId) {
            return; 
        }
        setCount(0);
        await updateDoc(doc(firestore, "userChats", currentUser.displayName), {
            [contextData.chatId + ".unreadcount"]: {
                count,
            }
        });
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
    const createGroup = async (groupName, groupImage) => {
        const groupId = groupName;
        try {
            const groupDoc = await getDoc(doc(firestore, "groupChats", groupId));
            console.log(groupDoc)
            if (!groupDoc.exists()) {
                const date = new Date().getTime();
                const storageRef = ref(storage, `${groupId}_${date}`);
                await uploadBytesResumable(storageRef, groupImage);
                const downloadUrl = await getDownloadURL(storageRef);
                await setDoc(doc(firestore, "groupChats", groupId), { messages: [] });
                await updateDoc(doc(firestore, "userGroups", currentUser.displayName), {
                    [groupId + ".groupInfo"]: {
                        displayName: groupName,
                        photoURL: downloadUrl,
                    },
                });
            }
        } catch (error) {
            console.error("Error during chat creation:", error);
        }
    };
    const getGroupChats = (callback) => {
        const id = currentUser.displayName;
        try {
            const q = query(doc(firestore, 'userGroups', id));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const groupData = snapshot.data();
                callback(groupData);
            });
            return unsubscribe;
        } catch (error) {
            console.error('Error getting chats:', error);
            return () => { };
        }
    };
    const handleGroupChange = (groupInfo) => {
        const data = groupInfo
        setGroupData(data);
    };
    const getGroupMessages = async () => {
        try {
            if (!groupData.displayName) {
                return [];
            }
            const snapshot = await getDoc(doc(firestore, 'groupChats', groupData.displayName));
            const messageData = snapshot.data();
            return messageData || [];
        } catch (error) {
            console.error('Error getting messages:', error);
            return [];
        }
    };
    const sendGroupMessage = async (message) => {
        await updateDoc(doc(firestore, "groupChats", groupData.displayName), {
            messages: arrayUnion({
                id: uuid(),
                message,
                senderId: currentUser.uid,
                senderName: currentUser.displayName,
                senderPhotoURL: currentUser.photoURL,
                date: Timestamp.now(),
            }),
        });
        const id = currentUser.displayName
        await updateDoc(doc(firestore, "userGroups", id), {
            [groupData.displayName + ".lastMessage"]: {
                message,
            },
            [groupData.displayName + ".date"]: serverTimestamp(),
        });
    }
    const addGroupMembers = async (member) => {
        const groupId = groupData.displayName
        await updateDoc(doc(firestore, 'userGroups', member), {
            [groupId + ".groupInfo"]: {
                displayName: groupData.displayName,
                photoURL: groupData.photoURL
            },
            [groupData.displayName + ".date"]: serverTimestamp(),
        });
    }
    return (
        <AppContext.Provider value={{ registerWithEmailAndPassword, updateUnread, addGroupMembers, sendGroupMessage, getGroupMessages, groupData, handleGroupChange, getGroupChats, getMessage, createGroup, contextData, handleUserChange, sendMessage, getChats, chatUser, findUser, selectUser, loginWithEmailAndPassword, logOut, isLoggedIn, currentUser }}>
            {props.children}
        </AppContext.Provider>
    );
}