import {createContext, useState, useEffect} from 'react';
//import {useLocation} from "react-router-dom";

export const UserContext = createContext({});

export function UserContextProvider(props){
    const {baseURL, children} = props;
    const [user, setUser] = useState(null);
    //const location = useLocation();

    useEffect(()=>{
        async function fetchUser(){
                const url = `${baseURL}/auth/profile/`; 
                const response = await fetch(url, 
                    {
                        method: "GET",
                        credentials: 'include',
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            
                        },
                    }
                )
                const data = await response.json()
                setUser(data)
        }

        fetchUser()
    }, []);

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}