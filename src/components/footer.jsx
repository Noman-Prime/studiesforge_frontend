"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#2B3F43] border-t border-white/10 text-white mt-20">

            <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    <div>
                        <h2 className="text-2xl font-bold">MoonAcademy</h2>

                        <p className="mt-4 text-sm text-gray-300 leading-6">
                            A structured platform for MDCAT preparation, MCQs practice, and student learning.
                        </p>

                        <div className="flex gap-4 mt-5 text-gray-300">
                            <FaFacebook className="text-xl hover:text-blue-400 cursor-pointer transition" />
                            <FaInstagram className="text-xl hover:text-pink-400 cursor-pointer transition" />
                            <FaYoutube className="text-xl hover:text-red-400 cursor-pointer transition" />
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>

                        <ul className="space-y-3 text-sm text-gray-300">
                            <li>
                                <Link href="/" className="hover:text-white transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/subjects" className="hover:text-white transition">
                                    Subjects
                                </Link>
                            </li>
                            <li>
                                <Link href="/topicPage" className="hover:text-white transition">
                                    Topics
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-white transition">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Contact</h3>

                        <div className="space-y-4 text-sm text-gray-300">

                            <div className="flex items-center gap-2">
                                <Mail size={18} className="text-white/80" />
                                support@moonacademy.com
                            </div>

                            <div className="flex items-center gap-2">
                                <Phone size={18} className="text-white/80" />
                                +92 302 735560
                            </div>

                            <div className="flex items-center gap-2">
                                <MapPin size={18} className="text-white/80" />
                                Punjab, Pakistan
                            </div>

                        </div>
                    </div>

                </div>

                <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400">

                    <p>© {new Date().getFullYear()} MoonAcademy. All rights reserved.</p>

                    <Link
                        href="/admin/login"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition duration-300"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        Admin
                    </Link>

                </div>

            </div>

        </footer>
    );
};

export default Footer;