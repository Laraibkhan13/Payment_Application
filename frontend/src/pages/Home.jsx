import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate=useNavigate();
    
  return (
    <div className=' bg-slate-950 h-screen '>
    <div className='  flex flex-col justify-center items-center w-full '>
        <h1 className=' text-4xl text-blue-500 font-extrabold mt-40'>WELCOME TO...</h1>
        <div className=' flex flex-row mt-10'>
        <h1 className=' text-8xl text-blue-950 font-extrabold italic'>PAY</h1>
        <h1 className=' text-8xl text-red-500 font-extrabold italic'>KRO</h1>    
        </div>
        <div className=' flex flex-row mt-10'>
            <button onClick={()=>{
                navigate('./signup')
            }} className=' w-32 h-10 bg-blue-950 m-5 text-white rounded-md italic font-bold'>SIGNUP</button>
            <button onClick={()=>{
                navigate('/signin')
            }} className=' w-32 h-10 bg-red-500 m-5 text-white font-bold rounded-md italic'>LOGIN </button>

        </div>
        
        
    </div>
    </div>
  )
}

export default Home