// // import { updateLeaderboard, getLeaderboard } from "../utils/databaseFunctions";
// const {
//   updateLeaderboard,
//   getLeaderboard,
// } = require("../utils/databaseFunctions");
// // 2, 3, 4, 4, 5
// let winTime = 0;
// let winMode = "easy";
// let curName = "🔥斯缇福🔥";

// async function asd() {
//   const currentLeaderboard = await getLeaderboard();

//   const currModeLeaderboard = currentLeaderboard.find(
//     (leaderboard) => leaderboard.mode === winMode
//   );
//   let i = 0;
//   while (i < 5) {
//     if (winTime < currModeLeaderboard.rank[i].timeUsed) {
//       const newRank = {
//         name: curName,
//         timeUsed: winTime,
//       };
//       currModeLeaderboard.rank.splice(i, 0, newRank);
//       currModeLeaderboard.rank.pop();
//       await updateLeaderboard(winMode, { rank: currModeLeaderboard.rank });
//       break;
//     }
//     i++;
//   }
// }

// asd();
