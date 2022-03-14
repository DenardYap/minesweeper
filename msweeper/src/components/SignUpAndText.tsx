import React, { useEffect, useState } from "react";
import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { DocumentData } from "firebase/firestore";

import {
  getLeaderBoard,
  Rank,
  updateLeaderboard,
  getUser,
  addUser,
  updateName,
  User,
} from "../utils/databaseFunctions";

import { CgCloseR } from "react-icons/cg";
import { tokenToString } from "typescript";

/** TODO
 * 1) Enable secure, strict, and httponly flag for Cookies 
 * 2) Prevent CSRF attack 
 * 
 * TODO
1) Mobile version
2) Test on real route 
3) Better UI 
4) Small bugs to be fixed 
LAST) Cypress & Jest & Test
strictly same site, http only and secure
 */
interface SignUpAndTextProps {
  auth: any;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  uid: string;
  setUid: React.Dispatch<React.SetStateAction<string>>;
}
const googleProvider = new GoogleAuthProvider();

const SignUpAndText: React.FC<SignUpAndTextProps> = ({
  auth,
  user,
  setUser,
  uid,
  setUid,
}) => {
  // const [user, setUser] = useState<User | null>(null);
  // const [uid, setUid] = useState("");
  const [show, setShow] = useState(false);
  const handleOnClickSignIn = () => {
    signInWithRedirect(auth, googleProvider);
  };

  const handleOnClickSignOut = () => {
    // signInWithRedirect(auth, googleProvider);
    // setUser to null, and delete cookies
    setUid("");
    setShow(false);
    setUser(null);

    // fetch(`${process.env.REACT_APP_API_URL!}/delete`, {
    fetch(
      `http://localhost:5001/minesweeper-9667e/us-central1/leaderboard/delete`,
      {
        // fetch(`http://localhost:8080/delete`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: process.env.REACT_APP_API_KEY!,
        },
      }
    );

    console.log("User signed out.");
  };

  const handleUserInput = (e: any) => {
    if (e.type == "blur") {
      if (e.target.value.length < 1) {
        e.target.value = user?.name;
        alert("Username must contain at least 1 character");
      } else if (e.target.value != user?.name) {
        updateName(uid, e.target.value);
        user!.name = e.target.value;
      }
    }
  };
  // const a = async () => {
  //   console.log(await addUser("ASDASD"));
  // }
  // a();

  useEffect(() => {
    (async () => {
      // verify uid, if true then log user in
      // verify first
      // fetch(`${process.env.REACT_APP_API_URL!}/login`, {
      fetch(
        `http://localhost:5001/minesweeper-9667e/us-central1/leaderboard/login`,
        {
          // fetch(`http://localhost:8080/login`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: process.env.REACT_APP_API_KEY!,
          },
        }
      )
        .then((res) => res.json())
        .then(async (res) => {
          if (res.uid) {
            // success
            setUid(res.uid);
            setUser((await getUser(res.uid)) as User);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })();

    getRedirectResult(auth)
      .then(async (result) => {
        if (result) {
          const { uid } = result.user;
          setUid(uid);

          const idToken = await result.user.getIdToken();

          // post request to get cookie
          // fetch(`${process.env.REACT_APP_API_URL!}/signup`, {
          fetch(
            `http://localhost:5001/minesweeper-9667e/us-central1/leaderboard/signup`,
            {
              // fetch(`http://localhost:8080/signup`, {
              method: "POST",
              credentials: "include", // Don't forget to specify this if you need cookies
              headers: {
                Authorization: process.env.REACT_APP_API_KEY!,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ idToken }),
            }
          ).then(async (res) => console.log("Asd", await res));

          //update database
          /** check if exists or not, if no, append a record
           */
          const user = await getUser(uid);
          if (!user) {
            // the user doesn't exist, so we add it to
            // our database, and then set the user for
            // our UI
            setUser(await addUser(uid));
          } else {
            // else, it's already in the database,
            // just setUser for our UI
            setUser(user as User);
          }
        }
      })
      .catch((error) => {
        // Handle Errors here.
        console.log("ERROR: Cannot verify user.");
      });
  }, []);

  return (
    <>
      {user ? (
        <div className="sm:flex flex-row  text-[100%] ">
          {show ? (
            <div className="fixed h-[105vh] w-[100vw] bg-[#00000070] z-[1000] bottom-[0.5vh] top-[0.5vh]">
              <div
                className="fixed h-[90vh] w-[50vw] bg-[#646464] 
          border-solid border-[0.4em] border-l-white border-t-white border-r-[#999] border-b-[#999] 
          z-[999] opacity-100
          top-0 bottom-0 left-0 right-0
          m-auto items-center"
              >
                <div className="flex flex-row  justify-between mx-[1vw] my-[1vh] items-center ">
                  <h2 className="text-[1.95vw]">
                    {user.name}'s Profile Stats 📜
                  </h2>
                  <CgCloseR
                    className="cursor-pointer hover:text-[#bd0404] text-[#ff3c2e]"
                    size={"3vw"}
                    onClick={() => setShow(false)}
                  ></CgCloseR>
                </div>
                <div className="flex-grow border-[0.4em] border-l-white border-t-white border-r-[#999] border-b-[#999]"></div>

                <div className="flex flex-col justify-between h-[87%]">
                  <div className="flex flex-row justify-center  overflow-y-auto">
                    <div className="flex flex-col my-[1vh] mx-[1vw] justify-between text-center text-[2.8vw] w-[30vw]">
                      <h2 className="font-bold text-[3vw]">
                        <u>Best time</u> ⌛
                      </h2>

                      <h3>
                        Easy:{" "}
                        {user.BestTimeEasy == 1000 ? "N/A" : user.BestTimeEasy}
                      </h3>
                      <h3>
                        Medium:{" "}
                        {user.BestTimeMedium == 1000
                          ? "N/A"
                          : user.BestTimeMedium}
                      </h3>
                      <h3>
                        Hard:{" "}
                        {user.BestTimeHard == 1000 ? "N/A" : user.BestTimeHard}
                      </h3>
                      <br />
                      <h2 className="font-bold text-[3vw]">
                        <u>Gold Coins</u> 💰{" "}
                      </h2>
                      <h3>{user.goldCoins} coins</h3>
                      <br />

                      <h2 className="font-bold text-[3vw]">
                        <u>Game Stats</u> 📈
                      </h2>
                      <h3>Total Game: {user.totalGame} </h3>
                      <h3>Total Time: {user.totalTime}</h3>
                      <h3>
                        Total Win:{" "}
                        {user.easyWin + user.mediumWin + user.hardWin}
                      </h3>
                      <h3>Easy Win: {user.easyWin} </h3>
                      <h3>Easy Lose: {user.easyLose}</h3>
                      <h3>Medium Win: {user.mediumWin}</h3>
                      <h3>Medium Lose: {user.mediumLose}</h3>
                      <h3>Hard Win: {user.hardWin}</h3>
                      <h3>Hard Lose: {user.hardLose}</h3>
                    </div>
                  </div>

                  <div className="flex-grow border-[0.4em] border-l-white max-h-[0.1vh] border-t-white border-r-[#999] border-b-[#999]"></div>

                  <div className="flex items-center justify-center ">
                    <button
                      className="cursor-pointer shadow-button hover:shadow-lg text-[1.5vw]
                  font-bold bg-slate-400 rounded text-white p-[1vw] hover:bg-slate-200 hover:text-black border-black
                  mt-[1vw] ssm:py-[2vh] my-[1vh]"
                      onClick={handleOnClickSignOut}
                    >
                      {" "}
                      Sign Out{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <button
            className="inline-block
    text-[100%] text-center bg-slate-400 font-bold  hover:bg-slate-200 hover:text-black text-inherit text-white rounded  shadow-md hover:shadow-lg
    w-[30vw] mb-[1vh] ssm:w-[30%] h-[6vh] ssm:ml-[4vw] ssm:mr-[1vw] sm:mx-[1vw] "
            onClick={() => setShow(true)}
          >
            Profile
          </button>
          <input
            id="signup"
            maxLength={12}
            minLength={1}
            placeholder={"You are signed in"}
            defaultValue={user.name}
            onBlur={handleUserInput}
            type="text"
            className="bg-slate-400 text-white hover:bg-slate-200 hover:text-black hover:placeholder-black 
      placeholder-white shadow-md hover:shadow-lg border-2 border-grey-700 rounded
      w-[60vw] sm:w-[80%] h-[6vh] px-[2%] mx-[1.25vw] "
          />
        </div>
      ) : (
        <div className="sm:flex flex-row  text-[100%]">
          <button
            className="inline-block
      text-[100%] text-center bg-slate-400 font-bold  hover:bg-slate-200 hover:text-black text-inherit text-white rounded  shadow-md hover:shadow-lg
      w-[25vw] mb-[1vh] ssm:w-[30%] h-[6vh] ssm:ml-[4vw] ssm:mr-[1vw] sm:mx-[1vw] "
            onClick={handleOnClickSignIn}
          >
            Sign on
          </button>
          <input
            id="signup"
            maxLength={12}
            placeholder={"your name..."}
            type="text"
            className="bg-slate-400 text-white hover:bg-slate-200 hover:text-black hover:placeholder-black 
        placeholder-white shadow-md hover:shadow-lg border-2 border-grey-700 rounded
        w-[60vw] sm:w-[80%] h-[6vh] px-[2%] mx-[1.25vw] "
          />
        </div>
      )}
    </>
  );
};

export default SignUpAndText;
