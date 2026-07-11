"use client";

import Link from "next/link";
import { Menu, X, LogOut, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/app/context/auth";

const Navbar = () => {
    const [show, setShow] = useState(false);
    const [profileShow, setProfileShow] = useState(false);

    const navRef = useRef(null);
    const profileRef = useRef(null);

    const { user, setUser } = useAuth();

    const logoutHandler = async () => {
        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/api/v1/user/logout`,
                {},
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                setUser(null);
                setProfileShow(false);
                setShow(false);
                toast.success("Logout successful");
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setShow(false);
            }

            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileShow(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#2B3F43] px-6 py-4 shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between">

                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight text-white transition hover:opacity-80"
                >
                    StudiesForge
                </Link>

                <div className="hidden items-center gap-8 md:flex">

                    <Link
                        href="/"
                        className="text-sm font-medium text-gray-200 transition hover:text-white"
                    >
                        Home
                    </Link>

                    <Link
                        href="/subjects"
                        className="text-sm font-medium text-gray-200 transition hover:text-white"
                    >
                        Subjects
                    </Link>

                    {user && (
                        <div ref={profileRef} className="relative">

                            <button
                                type="button"
                                onClick={() => setProfileShow(!profileShow)}
                                className="flex items-center"
                            >
                                <img
                                    src={user.image?.url || "/default-avatar.png"}
                                    alt="Admin"
                                    className="h-10 w-10 rounded-full border border-white/20 object-cover"
                                />
                            </button>

                            {profileShow && (
                                <div className="absolute right-0 top-14 w-52 rounded-2xl border border-white/10 bg-[#2B3F43] p-3 shadow-2xl">

                                    <div className="border-b border-white/10 px-3 py-2">
                                        <p className="text-sm font-semibold text-white">
                                            {user.firstName} {user.lastName}
                                        </p>

                                        <p className="text-xs text-gray-300">
                                            {user.email}
                                        </p>
                                    </div>

                                    <Link
                                        href="/admin"
                                        onClick={() => setProfileShow(false)}
                                        className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white hover:bg-white/10"
                                    >
                                        <User size={16} />
                                        My Account
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={logoutHandler}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white hover:bg-white/10"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>

                                </div>
                            )}

                        </div>
                    )}

                </div>
                <div className="flex items-center gap-4 md:hidden">

                    <div ref={navRef} className="relative">

                        <button
                            type="button"
                            onClick={() => setShow(!show)}
                            className="flex items-center text-white p-1"
                        >
                            {show ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        {show && (
                            <div className="absolute right-0 top-10 w-48 animate-in fade-in zoom-in-95 flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#2B3F43] p-4 shadow-2xl">

                                <Link
                                    href="/"
                                    onClick={() => setShow(false)}
                                    className="rounded-lg px-4 py-2 text-center text-sm font-medium text-white hover:bg-white/10"
                                >
                                    Home
                                </Link>

                                <Link
                                    href="/subjects"
                                    onClick={() => setShow(false)}
                                    className="rounded-lg px-4 py-2 text-center text-sm font-medium text-white hover:bg-white/10"
                                >
                                    Subjects
                                </Link>

                            </div>
                        )}

                    </div>


                    {user && (
                        <div ref={profileRef} className="relative">

                            <button
                                type="button"
                                onClick={() => setProfileShow(!profileShow)}
                                className="flex items-center"
                            >
                                <img
                                    src={user.image?.url || "/default-avatar.png"}
                                    alt="Admin"
                                    className="h-10 w-10 rounded-full border border-white/20 object-cover"
                                />
                            </button>


                            {profileShow && (
                                <div className="absolute right-0 top-14 w-60 rounded-2xl border border-white/10 bg-[#2B3F43] p-3 shadow-2xl">

                                    <div className="flex items-center gap-3 border-b border-white/10 px-3 py-3">

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-white">
                                                {user.firstName} {user.lastName}
                                            </p>

                                            <p className="truncate text-xs text-gray-300">
                                                {user.email}
                                            </p>
                                        </div>

                                    </div>


                                    <Link
                                        href="/admin"
                                        onClick={() => setProfileShow(false)}
                                        className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white hover:bg-white/10"
                                    >
                                        <User size={16} />
                                        My Account
                                    </Link>


                                    <button
                                        type="button"
                                        onClick={logoutHandler}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white hover:bg-white/10"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>

                                </div>
                            )}

                        </div>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;