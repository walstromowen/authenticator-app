import {createContext, useState, useEffect} from 'react';

export const UserContext = createContext({});

export function UserContextProvider(props){
    const {baseURL, children} = props;
    const [user, setUser] = useState(null);

    async function handleSetUser(){
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

    useEffect(()=>{
        handleSetUser()
    }, []);




    return(
        <UserContext.Provider value={{handleSetUser}}>
            {children}
        </UserContext.Provider>
    )
}