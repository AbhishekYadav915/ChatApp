// import React, { createContext, useContext, useState } from 'react'
// import Cookies from 'js-cookie'

// export const AuthContext = createContext()

//  export const AuthProvider = ({children}) => {
//     const initialUserState = Cookies.get("jwt") ||localStorage.getItem("ChatApp")

//     // parse the user data and storing in state.
//     const [authUser , setAuthUser] = useState(initialUserState?JSON.parse(initialUserState):undefined)
//   return (
//     <AuthContext.Provider  value={[authUser , setAuthUser]}>
//         {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth=()=>useContext(AuthContext)

import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const cookieJwt = Cookies.get("jwt");
    const localStorageData = localStorage.getItem("ChatApp");

    // If both cookie and localStorage are available, prioritize cookie
    const initialUserState = cookieJwt || localStorageData;

    let parsedUserState;
    try {
        parsedUserState = initialUserState ? JSON.parse(initialUserState) : undefined;
    } catch (error) {
        console.error('Error parsing user state:', error);
        parsedUserState = undefined;
    }

    const [authUser, setAuthUser] = useState(parsedUserState);

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
