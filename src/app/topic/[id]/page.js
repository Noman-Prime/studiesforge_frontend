"use client";

import axios from "axios";
import { use, useEffect, useState } from "react";
import { Loader2, BookOpen, Video, FileText, BrainCircuit, ArrowRight } from "lucide-react";
import Link from "next/link";

const Topic = ({ params }) => {
    const { id } = use(params);
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);

    const getTopic = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/topic/get/${id}`, { withCredentials: true });
            if (data?.topic) setTopic(data.topic);
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    useEffect(() => { if (id) getTopic(); }, [id]);

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-[#f8fafc]">
            <Loader2 className="h-12 w-12 animate-spin text-[#2B3F43]" />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6">
            <main className="mx-auto max-w-5xl">
                
                {/* Hero Section - The "Hook" */}
                <header className="relative mb-20 overflow-hidden rounded-[2rem] bg-[#1e293b] text-white shadow-2xl">
                    {topic?.image?.url && (
                        <div className="absolute inset-0 opacity-40">
                            <img src={topic.image.url} className="h-full w-full object-cover" alt="Cover" />
                        </div>
                    )}
                    <div className="relative z-10 flex flex-col items-center px-8 py-20 text-center">
                        <span className="mb-4 rounded-full bg-white/10 px-4 py-1 text-sm font-medium tracking-widest uppercase">Biology Module</span>
                        <h1 className="mb-8 max-w-3xl text-5xl font-extrabold leading-tight sm:text-6xl">{topic?.title}</h1>
                        <Link href={`/mcqs/${id}`} className="group flex items-center gap-2 rounded-full bg-[#E2E8F0] px-8 py-4 font-bold text-[#1e293b] transition-all hover:bg-white hover:scale-105">
                            Start Practice <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </header>

                {/* Content Grid */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
                    
                    {/* Main Reading Column */}
                    <div className="space-y-16">
                        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-[#1e293b]">
                                <BookOpen className="text-[#2B3F43]" /> Overview
                            </h2>
                            <p className="font-serif text-xl leading-relaxed text-gray-700 text-justify">
                                {topic?.description}
                            </p>
                        </section>

                        {topic?.video?.url && (
                            <section>
                                <h2 className="mb-6 text-2xl font-bold text-[#1e293b]">Lecture Visual</h2>
                                <div className="aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-2xl ring-4 ring-white">
                                    <video controls className="h-full w-full"><source src={topic.video.url} /></video>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar - The "Sticky" Notes */}
                    <aside className="space-y-8">
                        <div className="sticky top-8 rounded-3xl bg-[#2B3F43] p-8 text-white shadow-xl">
                            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                                <FileText /> Quick Notes
                            </h3>
                            <div className="space-y-6">
                                {topic?.notes?.split("\n").filter(i => i.trim()).map((note, idx) => (
                                    <div key={idx} className="border-l-2 border-white/20 pl-4">
                                        <p className="text-sm font-medium text-blue-100/70 mb-1">KEYPOINT {idx + 1}</p>
                                        <p className="font-serif text-lg leading-snug">{note}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default Topic;