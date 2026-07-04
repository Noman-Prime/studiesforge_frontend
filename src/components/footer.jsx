"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-gray-200 bg-[#2B3F43] text-white">
            <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-extrabold tracking-tight">StudiesForge</h2>
                        <p className="max-w-xs text-sm leading-relaxed text-gray-300">
                            Empowering students with structured resources, 
                            expert-led lectures, and comprehensive practice 
                            tools for academic success.
                        </p>
                        <div className="flex gap-4 pt-2 text-gray-300">
                            <a href="#" className="rounded-full bg-white/5 p-2 transition hover:bg-blue-600 hover:text-white"><FaFacebook size={18} /></a>
                            <a href="#" className="rounded-full bg-white/5 p-2 transition hover:bg-pink-600 hover:text-white"><FaInstagram size={18} /></a>
                            <a href="#" className="rounded-full bg-white/5 p-2 transition hover:bg-red-600 hover:text-white"><FaYoutube size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-400">Platform</h3>
                        <ul className="space-y-4 text-sm text-gray-300">
                            {['Home', 'Subjects', 'Topics', 'About'].map((item) => (
                                <li key={item}>
                                    <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="transition hover:ml-1 hover:text-white">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-400">Get In Touch</h3>
                        <div className="space-y-4 text-sm text-gray-300">
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-emerald-400" />
                                <span>support@studiesforge.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-emerald-400" />
                                <span>+92 302 735560</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin size={18} className="text-emerald-400" />
                                <span>Punjab, Pakistan</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-xs text-gray-400 md:flex-row">
                    <p>© {new Date().getFullYear()} StudiesForge. All rights reserved.</p>
                    
                    <Link
                        href="/admin/login"
                        className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition hover:bg-white/5 hover:text-white"
                    >
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                        Admin Dashboard
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;