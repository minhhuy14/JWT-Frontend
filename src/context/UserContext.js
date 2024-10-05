import { createContext, useEffect, useState } from 'react';
import { getUserAccount } from '../services/userService';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {

    const defaultUserData={   
        isLoading:true,
        isAuthenticated: false,
        token: "",
        account: {}
    }
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState(
        {   
            isLoading:true,
            isAuthenticated: false,
            token: "",
            account: {}
        });

    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser({...userData,isLoading:false});
    };

    // Logout updates the user data to default
    const logoutContext = () => {
        setUser({...defaultUserData,isLoading:false});
    };

    const fetchUserAccount=async ()=>{

        let response=await getUserAccount();
        if (response && +response.EC === 0) {
            let groupWithRoles = response.DT.roles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.accessToken;
            let data = {
                isAuthenticated: true,
                token,
                account: { groupWithRoles, email, username },
                isLoading:false
            }
            setUser(data);  
    }else {
        setUser({...defaultUserData,isLoading:false});
    };
    }

    useEffect(()=>{
     
        if ((window.location.pathname!=='/')&&window.location.pathname!=='/login'){
            fetchUserAccount();
        }
        else{
            setUser({...user,isLoading:false});
        }
        
    },[]);
    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext,logoutContext }}>
            {children}
        </UserContext.Provider>
    );
}


export { UserContext, UserProvider };