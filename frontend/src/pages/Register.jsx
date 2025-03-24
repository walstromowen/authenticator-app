import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {toast} from 'react-hot-toast';

export default function Register(props){
    const {baseURL} = props;
    const navigate = useNavigate();
    const [userParams, setUserParams] = useState({
        email: '',
        username: '',
        password: '',
    });
    async function registerUser(e){
        e.preventDefault();
        const {username, email, password} = userParams;
        const url = `${baseURL}/auth/register/`;//make this statefull variable or switch to axios?
        try{
            const response = await fetch(url,  
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                      },
                    body: JSON.stringify({email: email, username: username, password: password}),
                }
            )
            const data = await response.json();
            if(data.error){
                toast.error(data.error)
            }else{
                setUserParams({})
                toast.success('Registration Sucessful!')
                navigate('/login')
            }
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div className='page-container'>
            <form>
                <div className='form-container'>
                    <h2 className='form-header'>Register</h2>
                    <div className='form-row'>
                        <label>Email:</label>
                        <input type='email' placeholder="Enter email here." value={userParams.email} onChange={(e)=>{setUserParams({...userParams, email: e.target.value,})}}></input>
                    </div>
                    <div className='form-row'>
                        <label>Username:</label>
                        <input type='text' placeholder="Enter username here." value={userParams.username} onChange={(e)=>{setUserParams({...userParams, username: e.target.value,})}}></input>
                    </div>
                    <div className='form-row'>
                        <label>Password:</label>
                        <input type='password' placeholder="Enter password here." value={userParams.password} onChange={(e)=>{setUserParams({...userParams, password: e.target.value,})}}></input>
                    </div>
                    <button className='auth-button' onClick={(e)=>{registerUser(e)}}>Register</button>
                </div>
            </form>
        </div>
    )
}
