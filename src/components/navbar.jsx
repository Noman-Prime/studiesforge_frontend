"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
    const [show, setShow] = useState(false);
    const navRef = useRef(null);

    const handleShow = () => setShow(!show);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setShow(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#2B3F43] px-6 py-4 shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                
                {/* Logo */}
                <Link href="/" className="text-xl font-bold tracking-tight text-white transition hover:opacity-80">
                    StudiesForge
                </Link>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link href="/" className="text-sm font-medium text-gray-200 transition hover:text-white">
                        Home
                    </Link>
                    <Link href="/subjects" className="text-sm font-medium text-gray-200 transition hover:text-white">
                        Subjects
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div ref={navRef} className="md:hidden">
                    <button 
                        onClick={handleShow} 
                        className="flex items-center text-white p-1"
                        aria-label="Toggle Menu"
                    >
                        {show ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Mobile Menu Dropdown */}
                    {show && (
                        <div className="absolute right-6 top-[72px] w-48 animate-in fade-in zoom-in-95 flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#2B3F43] p-4 shadow-2xl">
                            <Link href="/" className="block rounded-lg px-4 py-2 text-center text-sm font-medium text-white hover:bg-white/10" onClick={() => setShow(false)}>
                                Home
                            </Link>
                            <Link href="/subjects" className="block rounded-lg px-4 py-2 text-center text-sm font-medium text-white hover:bg-white/10" onClick={() => setShow(false)}>
                                Subjects
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;