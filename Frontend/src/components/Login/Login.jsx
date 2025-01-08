import React, { useState } from 'react'
import './Login.css'
import { assets } from '../../assets/frontend_assets/assets'
import { useContext } from 'react'
import axios from 'axios'
import { StoreContext } from '../context/StoreContext'


const Login = ({ setShowLogin }) => {

  const {url,setToken}= useContext(StoreContext)
  const [currState, setCurrState] = useState("Sign Up")
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  })
  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))

  }


  const onLogin= async (event)=>{
event.preventDefault()
let newUrl = url;
if (currState==="Login") {
  newUrl+="/api/user/login"
}else{
  newUrl +="/api/user/register"
}
const response =await axios.post(newUrl,data);

if (response.data.success) {
  setToken(response.data.token)
  localStorage.setItem("token",response.data.token);
  setShowLogin(false)
}
else{
  alert(response.data.message)
}
 }



  return (
    <div className='login'>
      <form onSubmit={onLogin} action="post" className="login-container">
        <div className="login-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-inputs">
          {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name}type='text' placeholder='Enter your good name' required />}

          <input name="email" onChange={onChangeHandler} value={data.email} type='email' placeholder='Enter your good email' required />
          <input name="password" onChange={onChangeHandler} value={data.password} type='password' placeholder='Enter your strong password' required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-condition">
          <input type='checkbox' required />
          <p>Confirm you are Human</p>
        </div>
        {currState === "Login" ? <p>Create a account
          ?<span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
             : <p className='para'>Already have an account?<span onClick={()=>setCurrState("Login")}>Login</span></p>}


      </form>
    </div>
  )
}

export default Login
