import React from 'react'

import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,

} from "firebase/auth";
import Cookies from 'js-cookie';


interface User {
  displayName: string;
  photoUrl: string | null;
}

interface SignUpAndTextProps {
  auth : any;
}
const googleProvider = new GoogleAuthProvider();

const SignUpAndTextMobile : React.FC<SignUpAndTextProps> = ({auth}) => {
  return (
    
      
<>
    <div
      className="flex flex-row text-[100%] ssm:order-1 ssm:mt-[1vh]"
    >
      <button className="inline-block
      text-[125%] text-center bg-slate-400 font-bold hover:bg-slate-200 hover:text-black text-inherit text-white rounded  shadow-md hover:shadow-lg
      w-[25vw] mb-[0.5vh] ssm:w-[30%] h-[6vh] ssm:ml-[2vw] ssm:mr-[1vw]">
        Sign up
      </button>
      <input
        id="signup-mobile"
        maxLength={12}
        placeholder={"your name..."}
        type="text"
        className="bg-slate-400 text-white hover:bg-slate-200 hover:text-black hover:placeholder-black 
        placeholder-white shadow-md hover:shadow-lg border-2 border-grey-700 rounded text-[125%]
        w-[60vw] h-[6vh] px-[2%] mx-[1.25vw] "
      />
    </div>
    {/* Content */}
  </>
  )
}

export default SignUpAndTextMobile