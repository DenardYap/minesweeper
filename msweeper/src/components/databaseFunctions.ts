
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore/lite';

// return the credentials from our .env.local as a string
const serviceAccount : any = process.env.REACT_APP_CREDENTIALS;
// initialize the app 
const firebaseConfig = JSON.parse(serviceAccount);
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function readLeaderboard(mode : string) {   
    const leaderboardRef = await getDoc(doc(db, "leaderboard/" + mode))
    return leaderboardRef.data();
} 

async function updateLeaderboard(mode : string, data : object) {
    await updateDoc(doc(db, "leaderboard", mode), data);

}



export {readLeaderboard, updateLeaderboard}