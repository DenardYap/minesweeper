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

async function readLeaderboard(mode: string) {
  const leaderboardRef = await getDoc(doc(db, "leaderboard/" + mode));
  return leaderboardRef.data();
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

  console.log(leaderBoard);

  return leaderBoard;
}

export async function updateLeaderboard(currMode: string, newData: any) {
  // await updateDoc(doc(db, "leaderboard", mode), data);
  const modeRef = doc(db, "leaderboard_test", currMode);
  await updateDoc(modeRef, newData);
}

export { readLeaderboard };
