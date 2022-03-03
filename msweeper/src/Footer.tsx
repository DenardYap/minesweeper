import React from 'react'
import {AiFillGithub, AiFillLinkedin, AiOutlineMail} from "react-icons/ai"
import { IconContext } from 'react-icons'
const Footer = () => {
  return (
    <div className='flex ssm:flex-col sm:flex-row ssm:items-center sm:justify-between
                     text-[#373737] bg-[#e2e8f0]
                    sm:h-[21vh] sm:mw-[100%] '>
        <div className='ssm:order-2 sm:order-1 flex ssm:flex-col px-[1vw] text-3xl ssm:items-center sm:items-start'>  
            <h3 className='pt-[1vh] underline font-bold'>Design and programmed by</h3>
            <div className='flex ssm:flex-col sm:flex-row py-[1vh] '>
            
                <div className='flex flex-col pr-[1vw] pt-[1vh] ssm:items-center sm:items-start'>
                    <div className='flex flex-row items-center '>
                        <h2 className='pr-[0.5vw]  font-bold '>Bernard Yap</h2>
                        <a href="mailto:mameehy@hotmail.com" className=''><AiOutlineMail size={30}/></a>
                    </div>
                    <div className='flex flex-row items-center '>
                        <a href='https://github.com/DenardYap' target="_blank" className='pr-[0.5vw]'><AiFillGithub className='-button' size={50} /></a>
                        <a href='https://www.linkedin.com/in/bernard-yap/' target="_blank"><AiFillLinkedin size={50} /></a>
                    </div>
                </div>
                <div className='flex flex-col px-[1vw] pt-[1vh]  ssm:items-center sm:items-start'>
                    <div className='flex flex-row  items-center '>
                        <h2 className='pr-[0.5vw]  font-bold '>Jing Xian Chai</h2>
                        <a href="mailto:jingxianchai01@gmail.com"><AiOutlineMail size={30} /></a>
                    </div>
                    <div className='flex flex-row items-center '>
                        <a href='https://github.com/jingxian01' target="_blank" className='pr-[0.5vw]'><AiFillGithub size={50} /></a>
                        <a href='https://www.linkedin.com/in/jingxianchai' target="_blank"><AiFillLinkedin size={50} /></a>
                    </div>
                </div>
            </div>
        </div>  

        <div className='ssm:order-1 sm:order-2 flex flex-col px-[1vw] ssm:items-center sm:items-start '>
            <button className='rounded mr-[1vw] mb-[0.5vw] mt-[1vw] p-[1vw] bg-[#373737] text-[#e2e8f0] text-2xl
            shadow-button hover:shadow-lg font-bold hover:bg-slate-200 hover:text-black border-black border-2'>How to Play</button>
            <a href='https://forms.gle/4kkatQYjHSPScbLRA' className='underline text-2xl' target="_blank">Feedback Form</a>
            <h3 className='text-lg'>help us improve :')</h3>
        </div>
    </div>
  )
}

export default Footer