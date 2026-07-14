"use client";

import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="mt-20 bg-[#2B3F43] text-white">

            <div className="mx-auto max-w-[1500px] px-6 py-14 lg:px-16">


                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">


                    <div>


                        <h2 className="text-3xl font-extrabold">
                            StudiesForge
                        </h2>


                        <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">

                            A structured MDCAT preparation platform
                            providing organized subjects, topics,
                            practice resources and learning materials.

                        </p>



                        <div className="mt-6 flex gap-3">


                            <a
                                href="#"
                                className="rounded-full bg-white/10 p-3 transition hover:bg-blue-600"
                            >
                                <FaFacebook size={18} />
                            </a>


                            <a
                                href="#"
                                className="rounded-full bg-white/10 p-3 transition hover:bg-pink-600"
                            >
                                <FaInstagram size={18} />
                            </a>


                            <a
                                href="#"
                                className="rounded-full bg-white/10 p-3 transition hover:bg-red-600"
                            >
                                <FaYoutube size={18} />
                            </a>


                        </div>


                    </div>




                    <div>


                        <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white/50">
                            Contact
                        </h3>


                        <div className="space-y-4 text-sm text-white/70">


                            <div className="flex items-center gap-3">

                                <Mail
                                    size={18}
                                    className="text-emerald-400"
                                />

                                <span>
                                    studiesforge@gmail.com
                                </span>

                            </div>




                            <div className="flex items-center gap-3">

                                <MapPin
                                    size={18}
                                    className="text-emerald-400"
                                />

                                <span>
                                    Punjab, Pakistan
                                </span>

                            </div>


                        </div>


                    </div>



                </div>




                <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row">


                    <p>
                        © {new Date().getFullYear()} StudiesForge. All rights reserved.
                    </p>



                    <Link
                        href="/admin/login"
                        className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 transition hover:bg-white/10 hover:text-white"
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