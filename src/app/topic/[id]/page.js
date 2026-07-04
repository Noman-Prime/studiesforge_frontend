"use client";

import axios from "axios";
import { use, useEffect, useState } from "react";
import { Loader2, FileText, Video, BookOpen } from "lucide-react";

const Topic = ({ params }) => {
    const { id } = use(params);
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);

    const getTopic = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/api/v1/topic/get/${id}`,
                { withCredentials: true }
            );
            if (data?.topic) setTopic(data.topic);
        } catch (error) {
            console.error("Error fetching topic:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) getTopic();
    }, [id]);

    if (loading) return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#2B3F43]" />
        </div>
    );

    if (!topic) return (
        <div className="py-20 text-center text-gray-500">
            <h2 className="text-2xl font-semibold">Topic not found</h2>
        </div>
    );

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header Image */}
            {topic?.image?.url && (
                <div className="relative h-[300px] w-full lg:h-[450px]">
                    <img
                        src={topic.image.url}
                        alt={topic.title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
            )}

            <div className="mx-auto max-w-4xl px-6 py-10">
                <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-[#2B3F43] sm:text-5xl">
                    {topic.title}
                </h1>

                {/* Description */}
                <section className="mb-12">
                    <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                        <BookOpen size={20} /> Overview
                    </h2>
                    <p className="whitespace-pre-line text-lg leading-relaxed text-gray-700">
                        {topic.description || "No description available."}
                    </p>
                </section>

                {/* Video Lecture */}
                {topic?.video?.url && (
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                            <Video size={20} /> Video Lecture
                        </h2>
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-lg">
                            <video controls className="w-full">
                                <source src={topic.video.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </section>
                )}

                {/* Notes */}
                <section className="mb-12">
                    <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
                        <FileText size={20} /> Learning Notes
                    </h2>
                    {topic.notes ? (
                        <div className="space-y-4">
                            {topic.notes.split("\n").filter(i => i.trim()).map((item, idx) => (
                                <div key={idx} className="flex gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2B3F43] text-sm font-bold text-white">
                                        {idx + 1}
                                    </span>
                                    <p className="text-gray-700 leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">No notes added yet.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Topic;