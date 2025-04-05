import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );
    const [searchKeyword, setSearchKeyword] = useState("");
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, searchKeyword, setSearchKeyword }}>
            {children}
        </AuthContext.Provider>
    );
};

//