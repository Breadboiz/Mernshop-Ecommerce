import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("authUser"));
        if (storedUser) setAuthUser(storedUser);
      }, []);
    
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser,  }}>
            {children}
        </AuthContext.Provider>
    );
};

//