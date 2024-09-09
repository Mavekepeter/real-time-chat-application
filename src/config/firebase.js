// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth,signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAx1pNhpV0tYRwD1lsRO1QMGRQ8P_9uCzY",
  authDomain: "chat-app-gs-a9e8d.firebaseapp.com",
  projectId: "chat-app-gs-a9e8d",
  storageBucket: "chat-app-gs-a9e8d.appspot.com",
  messagingSenderId: "873679498664",
  appId: "1:873679498664:web:5c08bea7c1e37b8169c19d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey there am using chat app ",
            lastSeen:Date.now()
        })
       await setDoc(doc(db,"chats",user.uid),{
        chatData:[]
       })
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}
const login = async (email,password) =>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
      console.error(error) 
       toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}
const logout = async () =>{
   try {
    await signOut(auth)
   } catch (error) {
    console.error(error) 
       toast.error(error.code.split('/')[1].split('-').join(' '));
   }
}

export {signup,login,logout,auth,db}