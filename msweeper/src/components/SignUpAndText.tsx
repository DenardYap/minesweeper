import React from 'react'

const SignUpAndText = () => {


  return (      
<>
    <div
      className="sm:flex flex-row  text-[100%] ssm:hidden "
    >
      <button className="inline-block
      text-[100%] text-center bg-slate-400 font-bold  hover:bg-slate-200 hover:text-black text-inherit text-white rounded  shadow-md hover:shadow-lg
      w-[25vw] mb-[1vh] ssm:w-[25%] h-[6vh] ssm:ml-[4vw] ssm:mr-[1vw] sm:mx-[1vw] ">
        Sign up
      </button>
      <input
        id="signup"
        maxLength={16}
        placeholder={"your name..."}
        type="text"
        className="bg-slate-400 text-white hover:bg-slate-200 hover:text-black hover:placeholder-black 
        placeholder-white shadow-md hover:shadow-lg border-2 border-grey-700 rounded
        w-[60vw] sm:w-[80%] h-[6vh] px-[2%] mx-[1.25vw] "
      />
    </div>
    {/* Content */}
  </>
  )
}

export default SignUpAndText