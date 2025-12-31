// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { collection, addDoc, getDocs, deleteDoc, updateDoc,
    doc} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"
import { getFirestore }  from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBBCnfR0wgTng4Qve6jomEtAQID5WFZKZo",
    authDomain: "wedding-rsvp-d153a.firebaseapp.com",
    projectId: "wedding-rsvp-d153a",
    storageBucket: "wedding-rsvp-d153a.firebasestorage.app",
    messagingSenderId: "1079640751286",
    appId: "1:1079640751286:web:126bb5188c01ba7a313a17"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore (app);

//Add a Guest
export async function addGuest(guestData) {
    try {
        const docRef = await addDoc (collection(db, "guests"), guestData);
        return {id: docRef.id, ...guestData}
    }   catch (error) {
        console.error("error adding guest:", error);
    }
}

//Get Guest
export async function getGuest() {
    const guests = [];
    try {const querySnapshot = await getDocs(collection(db, "guests"))
    querySnapshot.forEach((doc)=>{
        guests.push({id: doc.id, ...doc.data()})
    })
    } catch(error) {
        console.error("error retrieving guests: ", error);
    }
    return guests; 
}