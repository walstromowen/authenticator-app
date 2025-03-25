import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import {toast} from 'react-hot-toast';

export default function Login(props){
    const {baseURL} = props;
    const navigate = useNavigate();
   
    const [userParams, setUserParams] = useState({
        username: '',
        password: '',
    });

    async function loginUser(e){
        e.preventDefault();
        const {username, password} = userParams;
        const url = `${baseURL}/auth/login/`;
        try{
            const response = await fetch(url,  
                {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        
                      },
                    body: JSON.stringify({username: username, password: password}),
                }
            )
            const data = await response.json();
            if(data.error){
                toast.error(data.error)
            }else{
                setUserParams({})
                toast.success('Login Sucessful!')
                navigate('/dashboard')
            }
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className='page-container'>
            <form>
                <div className='form-container'>
                    <h2 className='form-header'>Login</h2>
                    <div className='form-row'>
                        <label>Username:</label>
                        <input type='text' placeholder="Enter username here." value={userParams.username} onChange={(e)=>{setUserParams({...userParams, username: e.target.value,})}}></input>
                    </div>
                    <div className='form-row'>
                        <label>Password:</label>
                        <input type='password' placeholder="Enter password here." value={userParams.password} onChange={(e)=>{setUserParams({...userParams, password: e.target.value,})}}></input>
                    </div>
                    <button className='auth-button' onClick={(e)=>{loginUser(e)}}>Login</button>
                    <Link className='register-link' to='/register'>Don't have an account? Register here!</Link>
                </div>
            </form>
        </div>
    )
}
