"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
                setUser(null);
            }

        } catch (error) {
            setUser(null);

        } finally {
            setLoading(false);
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
                loading,
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