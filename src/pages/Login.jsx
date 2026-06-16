import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {
    const [loginInfo, setLoginInfo]= useState({
      
        email:"",
        password:""
    })
    const navigate = useNavigate()
    const handleChange = (e)=>{
  const {name,value}= e.target 
  const copyLoginInfo = {...loginInfo}
  copyLoginInfo[name]= value
  setLoginInfo(copyLoginInfo)
    }

    const handleSignup =async(e)=>{
        e.preventDefault()
        const {email,password}= loginInfo
        if( !email || !password){
            alert("email  or password are not defined")
        }
        try{

            const url ='http://localhost:8000/api/user/login'

            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            })
            const result = await response.json()
            const {success,message,jwtToken,name,error}= result
            if(success){
                alert(message )
                localStorage.setItem('token', jwtToken)
                
                setInterval(()=>{
                    navigate('/')
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
        
        <div  className='flex flex-col'>
            <label htmlFor="name">Email</label>
        <input onChange={handleChange}
        className='border'
        type="text"
        name='email'
        placeholder='Enter your email..'
         value={loginInfo.email}
        
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
          value={loginInfo.password}
       
        />
        </div>
        <br />
        <button className='border'>Login</button>
        <span>Aleady have an account ?
            <Link to="/signup">Login</Link>
        </span>
      </form>

      
    </div>
  )
}

export default Login
