import {createContext, useState, useEffect} from 'react';

export const UserContext = createContext({});

export function UserContextProvider(props){
    const {baseURL, children} = props;
    const [user, setUser] = useState(null);


    useEffect(()=>{
        if(!user){
            const url = `${baseURL}/auth/profile/`; 
            fetch(url, 
                {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        
                    },
                }
            ).then((response)=>{
                console.log(response.json())
                setUser(response.json())
            })
        }
    }, []);



        /*
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
   
    */

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}