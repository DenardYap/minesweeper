import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  DocumentData,
} from "firebase/firestore";

/**
 * collections: leaderboard
 * documents: easy, medium, hard
 * fields: 0, 1, 2, 3
 * values: {
 *    name
 *    timeUsed
 * }
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

async function readLeaderboard(mode: string) {
  const leaderboardRef = await getDoc(doc(db, "leaderboard/" + mode));
  return leaderboardRef.data();
}

async function updateLeaderboard(mode: string, data: object) {
  await updateDoc(doc(db, "leaderboard", mode), data);
}

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

interface Rank {
  name: string;
  timeUsed: number;
}

export interface LeaderboardData {
  mode: string;
  rank: Rank[];
}

export async function getLeaderBoard(): Promise<LeaderboardData[]> {
  const querySnapshot = await getDocs(collection(db, "leaderboard_test"));
  const leaderBoard: LeaderboardData[] = [];
  querySnapshot.forEach(async (doc) => {
    const documentData: DocumentData = doc.data();
    leaderBoard.push({ mode: doc.id, rank: documentData.rank });
  });
  return leaderBoard;
}

export { readLeaderboard, updateLeaderboard };
