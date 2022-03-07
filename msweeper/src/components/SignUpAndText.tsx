import React, { useEffect, useState } from "react";
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

interface User {
  displayName: string;
  photoUrl: string | null;
}


const app = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSENGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);



const SignUpAndText = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleOnClickSignIn = () => {
    signInWithRedirect(auth, googleProvider);
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        if (result) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          // console.log("credential: ", credential);

          const token = credential ? credential.accessToken : null;
          // console.log("token: ", token);

          // The signed-in user info.
          const { displayName, photoURL, uid } = result.user;
          const currentUser: User = {
            displayName: displayName
              ? displayName
              : `minesweeper ${uid.substring(0, 5)}`,
            photoUrl: photoURL ? photoURL : null,
          };
          setUser(currentUser);
        }
      })
      .catch((error) => {
        // Handle Errors here.
        console.log("error: ", error);

        const errorCode = error.code;
        console.log("errorCode: ", errorCode);

        const errorMessage = error.message;
        console.log("errorMessage", errorMessage);

        // The email of the user's account used.
        const email = error.email;
        console.log("email: ", email);

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("credentials from error: ", credential);
      });
  }, []);

  return (
    <>
      {user ? (
        <div className="inline-flex items-center justify-center space-x-4">
          {user.photoUrl ? (
            <img
              src={user.photoUrl}
              className="rounded-full"
              height="50"
              width="50"
            />
          ) : null}
          <div>{user.displayName}</div>
        </div>
      ) : (
        <div className="sm:flex flex-row  text-[100%] ssm:hidden ">
          <button
            className="inline-block
      text-[100%] text-center bg-slate-400 font-bold  hover:bg-slate-200 hover:text-black text-inherit text-white rounded  shadow-md hover:shadow-lg
      w-[25vw] mb-[1vh] ssm:w-[25%] h-[6vh] ssm:ml-[4vw] ssm:mr-[1vw] sm:mx-[1vw] "
            onClick={handleOnClickSignIn}
          >
            Sign up
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
