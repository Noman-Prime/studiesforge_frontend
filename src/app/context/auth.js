"use client";
// test deployment
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const checkLogin = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/api/v1/user/me`,
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                setUser(res.data.user);
            } else {
                checkLogin();
            }

        } catch (error) {
            setUser(null);
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                checkLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
};