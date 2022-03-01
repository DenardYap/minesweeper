import React from 'react'

const SignUpAndText = () => {
  return (
    
      
<>
    <div
      style={{ fontFamily: "Montserrat-medium" }}
      className="flex flex-row  text-[100%]"
    >
      <button className="w-[25vw] mb-[1vh] ssm:w-[25%] h-[6vh] ssm:ml-[4vw] ssm:mr-[1vw] sm:mx-[1vw] text-[100%] text-center inline-block bg-slate-400 font-bold  hover:bg-slate-200 hover:text-black text-inherit text-white rounded  shadow-md hover:shadow-lg">
        Sign up
      </button>
      <input
        placeholder={"your name..."}
        type="text"
        className="bg-slate-400 text-white hover:bg-slate-200 hover:text-black hover:placeholder-black placeholder-white w-[60vw] sm:w-[80%] h-[6vh] px-[2%] mx-[1.25vw] shadow-md hover:shadow-lg border-2 border-grey-700 rounded"
      />
    </div>
    {/* Content */}
  </>
  )
}

export default SignUpAndText