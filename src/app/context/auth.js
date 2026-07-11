"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (data) => {
        const resp = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/api/v1/user/login`,
            data,
            { withCredentials: true }
        );

        if (resp.data.success) {
            setUser(resp.data.user);
            return true;
        }
        return false;
    };

    const checkLogin = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/api/v1/user/me`,
                { withCredentials: true }
            );

            if (res.data.success) {
                setUser(res.data.user);
            }
        } catch (error) {
            setUser(null);
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, login, checkLogin }}>
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