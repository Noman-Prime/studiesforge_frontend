"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
    const [show, setShow] = useState(false);
    const navRef = useRef(null);
    process.env.API
    
    const handleShow = () => {
        setShow(!show);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setShow(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-2 bg-[#2B3F43] border-b border-slate-700 shadow-md">
            <Link href="/" className="text-xl px-3 py-1 rounded-[10px] border-2 transition-colors hover:text-blue-600 font-bold bg-white text-black">
                MoonAccedmy
            </Link>
            <div className="hidden md:flex gap-4 text-white text-sm font-medium">
                <Link href="/" className="px-3 py-1 rounded-[10px] border-2 transition-colors hover:text-blue-600 font-bold bg-white text-black">
                    Home
                </Link>
                <Link href="/subjects" className="px-3 py-1 rounded-[10px] border-2 transition-colors hover:text-blue-600 font-bold bg-white text-black">
                    Subjects
                </Link>
                <Link href="/admin" className="px-3 py-1 rounded-[10px] border-2 transition-colors hover:text-blue-600 font-bold bg-white text-black">
                    AdminControl
                </Link>
            </div>

            {/* Mobile Container (Toggle + Menu) */}
            <div ref={navRef} className="md:hidden flex items-center text-white">
                <button onClick={handleShow} className="p-1">
                    {show ? <X size={24} /> : <Menu size={24} />}
                </button>

                {show && (
                    <div className="absolute top-[52px] right-6 w-40 bg-[#2B3F43] border border-white rounded-[15px] p-3 flex flex-col gap-2 shadow-2xl z-40">
                        <Link href="/" className="block bg-white text-black text-sm font-bold text-center py-1.5 rounded-[10px]" onClick={() => setShow(false)}>
                            Home
                        </Link>
                        <Link href="/subjects" className="block bg-white text-black text-sm font-bold text-center py-1.5 rounded-[10px]" onClick={() => setShow(false)}>
                            Subjects
                        </Link>
                        <Link href="/topicPage" className="block bg-white text-black text-sm font-bold text-center py-1.5 rounded-[10px]" onClick={() => setShow(false)}>
                            Topics
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;