import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Signup = () => {
    const [signupInfo, setSignupInfo]= useState({
        name:"",
        email:"",
        password:""
    })
    const navigate = useNavigate()
    const handleChange = (e)=>{
  const {name,value}= e.target 
  const copyLoginInfo = {...signupInfo}
  copyLoginInfo[name]= value
  setSignupInfo(copyLoginInfo)
    }

    const handleSignup =async(e)=>{
        e.preventDefault()
        const {name,email,password}= signupInfo
        if(!name || !email || !password){
            alert("email , name or password are not defined")
        }
        try{

            const url ='http://localhost:8000/api/user/signup'

            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            })
            const result = await response.json()
            const {success,message,error}= result
            if(success){
                alert(message )
                setInterval(()=>{
                    navigate('/login')
                },1000)
                
            }
            else if(error){
                const details = error.details[0].message
                alert(details)
            }
            console.log(error)
            
        }catch(err){
            alert(err)

        }
    }
  return (
    <div className=' flex justify-center item center'>
      <h1>SignUp</h1>
      <form className=' flex flex-col  justify-center w-100 h-200' action="" onSubmit={handleSignup}>
        <div className='flex flex-col'>
            <label htmlFor="name">Name</label>
        <input
        className='border' 
        onChange={handleChange}
        type="text"
        name='name'
        placeholder='Enter your name..'
        autoFocus 
        value={signupInfo.name}
        />
        </div>
        <div  className='flex flex-col'>
            <label htmlFor="name">Email</label>
        <input onChange={handleChange}
        className='border'
        type="text"
        name='email'
        placeholder='Enter your email..'
         value={signupInfo.email}
        
        />
        </div>
        <div  className='flex flex-col'> 
            <label htmlFor="name">Password</label>
        <input 
        onChange={handleChange}
        className='border'
        type="text"
        name='password'
        placeholder='Enter your password..'
          value={signupInfo.password}
       
        />
        </div>
        <br />
        <button className='border'>SignUp</button>
        <span>Aleady have an account ?
            <Link to="/login">Login</Link>
        </span>
      </form>

      
    </div>
  )
}

export default Signup
