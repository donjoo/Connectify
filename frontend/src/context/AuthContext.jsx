import React, {  createContext, useEffect, useState } from 'react';
import { loginUser, logoutUser ,refreshToken } from "../../services/authService";



export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null)


    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const userData = await refresh();
                    setUser(userData);
                } catch (err) {
                    setError(err.message);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_Token');
                }
            }
            setLoading(false);
        };


        checkAuth();
    },[]);



    const login_user = async (credentials) => {
        try {
            const userData = await loginUser(credentials);
            setUser(userData);
            setError(null)
            return userData;

        } catch (err){
            setError(err.message);
            throw err;
        }
    };



    const logout_user = () => {
        logoutUser();
        setUser(null)
    };



    const refresh = async () => {
        const refreshTokenValue = localStorage.getItem('refresh_token');
        if (!refreshTokenValue) throw new Error('No refresh token available');
        
        const userData = await refreshToken(refreshTokenValue);
        return userData;
      };


    return(
        <AuthContext.Provider value={{user, loading,error, login_user, logout_user}} >
            {children}
        </AuthContext.Provider>
    );

};