import { useContext } from "react";
import { UserContext } from "../context/UserContext"; 


export default function Dashboard(){
    const {user} = useContext(UserContext)
    
    return(
        
        <div className='page-container'>
            {!!user && (
                <div className='form-container'>
                <h2 className='form-header'>Hello {user.username}!</h2>
                <p>Welcome to your dashboard authenticated with JWT</p>
                </div>
            )}
        </div>
    )
}