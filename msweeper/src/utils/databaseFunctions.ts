import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  DocumentData,
  query,
  orderBy,
  setDoc,
  where
} from "firebase/firestore";

/**
 * collection: leaderboard_test
 * documents: easy, medium, hard
 * fields: rank
 * values: [
 *  { name: ... , timeUsed: ... },
 *  {},
 *  {},
 *  {},
 * ]
 */

// initialize the app
const app = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSENGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

const db = getFirestore(app);

export async function readLeaderboard(mode: string) {
  const leaderboardRef = await getDoc(doc(db, "leaderboard_test/" + mode));
  return leaderboardRef.data();
}

export async function getUser(uid: string) {

  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;

  // const usersRef = collection(db, "users")
  // const q = query(usersRef)

  // const querySnapshot = await getDocs(q)
  // let user = null;
  // querySnapshot.forEach((doc) => {
  //   if (doc.id === uid) {
  //     user = doc.data()
  //   }
  // })

  // return user
}

export interface Rank {
  name: string;
  timeUsed: number;
}

export interface LeaderboardData {
  index: number;
  mode: string;
  rank: Rank[];
}

export async function getLeaderBoard(): Promise<LeaderboardData[]> {
  const leaderBoard: LeaderboardData[] = [];

  const leaderboardRef = collection(db, "leaderboard_test");
  const queryData = await getDocs(
    query(leaderboardRef, orderBy("index", "asc"))
  );

  queryData.forEach(async (doc) => {
    const documentData: DocumentData = doc.data();
    leaderBoard.push({
      index: documentData.index,
      mode: doc.id,
      rank: documentData.rank,
    });
  });

  return leaderBoard;
}

export async function updateLeaderboard(currMode: string, newData: any) {
  // await updateDoc(doc(db, "leaderboard", mode), data);
  const modeRef = doc(db, "leaderboard_test", currMode);
  await updateDoc(modeRef, newData);
}

export interface User {
  BestTimeEasy: number,
    BestTimeMedium: number,
    BestTimeHard: number,
    easyLose: number,
    easyWin: number,
    hardLose: number,
    hardWin: number,
    mediumLose: number,
    mediumWin: number,
    goldCoins: number
    name: string,
    totalGame: number,
    totalTime: number,
}

export async function addUser(uid : string) {
  // await updateDoc(doc(db, "leaderboard", mode), data);
  const data: User = {
    BestTimeEasy: 1000,
    BestTimeMedium: 1000,
    BestTimeHard: 1000,
    easyLose: 0,
    easyWin: 0,
    hardLose: 0,
    hardWin: 0,
    mediumLose: 0,
    mediumWin: 0,
    goldCoins: 0,
    name: `msweeper${uid.substring(0, 4)} `,
    totalGame: 0,
    totalTime: 0,
  }
  const modeRef = await setDoc(doc(db, "users", uid), data);
  return data; 
}

export async function updateName(uid : string, name : string, wait : boolean = false) {
  if (wait) {
    await updateDoc(doc(db, "users", uid), {
      name
    });
  }
  else {
    updateDoc(doc(db, "users", uid), {
      name
    });
  }
}

export function updateUser(uid: string, user: User) {
  updateDoc(doc(db, "users", uid), {
    ...user
  })
}
