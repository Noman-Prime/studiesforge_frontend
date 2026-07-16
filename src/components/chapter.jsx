"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Chapters = () => {
    const [subject, setSubject] = useState([]);
    const [chapter, setChapter] = useState([]);

    const fetchSubject = async () => {
        try {
            const result = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/api/v1/subject/all`,
                {
                    withCredentials: true,
                }
            );

            if (result.data.success) {
                setSubject(result.data.subject);
            }
        } catch (error) {
            console.log(error.response?.data?.error);
            toast.error(error.response?.data?.error || "Failed to fetch subjects");
        }
    };

    useEffect(() => {
        fetchSubject();
    }, []);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const data = [];

                for (const item of subject) {
                    const result = await axios.get(
                        `${process.env.NEXT_PUBLIC_API}/mdcat/chapter/subject/${item._id}`, { withCredentials: true });
                    if (result.data.success) {
                        data.push({
                            subject: item,
                            chapters: result.data.chapter || [],
                        });
                    }
                }

                setChapter(data);
            } catch (error) {
                console.log(error.response?.data?.error);
                toast.error(error.response?.data?.error || "Failed to fetch chapters");
            }
        };

        if (subject.length) {
            fetchChapters();
        }
    }, [subject]);

    return (
        <section className="bg-gradient-to-br from-[#eef5f6] via-[#f8fafc] to-white px-4 py-12 lg:px-16">
            <div className="mx-auto max-w-[1500px]">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-[#2B3F43] sm:text-4xl lg:text-5xl">
                        Explore Chapters
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm text-gray-600 sm:text-base lg:text-lg">
                        Continue your preparation chapter by chapter with
                        organized subject-wise learning.
                    </p>
                </div>

                <div className="space-y-16">
                    {chapter.map((item) => (
                        <div key={item.subject._id}>
                            <div className="mb-7 flex items-center justify-between border-b border-gray-200 pb-3">
                                <h3 className="text-xl font-bold text-[#2B3F43] sm:text-2xl">
                                    {item.subject.title}
                                </h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                                {item.chapters.slice(0, 3).map((chapter) => (
                                    <Link
                                        key={chapter._id}
                                        href={`/chapter/${chapter._id}`}
                                        className="group flex min-h-[190px] flex-col justify-between rounded-2xl border border-white bg-white p-5 shadow-[0_10px_30px_rgba(43,63,67,0.10)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(43,63,67,0.18)]"
                                    >
                                        <div>
                                            <span className="rounded-full bg-[#2B3F43]/10 px-3 py-1 text-xs font-semibold text-[#2B3F43]">
                                                Chapter {chapter.number}
                                            </span>

                                            <h4 className="mt-5 line-clamp-2 text-sm font-bold text-[#2B3F43] sm:text-lg">
                                                {chapter.title}
                                            </h4>
                                            <p className="mt-6 text-xs font-medium text-gray-500 transition group-hover:text-[#2B3F43] sm:text-sm">
                                                Explore Topics →
                                            </p>
                                        </div>
                                    </Link>
                                ))}

                                {item.chapters.length === 0 && (
                                    <div className="col-span-2 rounded-2xl border border-dashed border-gray-300 bg-white py-12 text-center text-sm text-gray-500 lg:col-span-4">
                                        No chapters available.
                                    </div>
                                )}

                                {item.chapters.length > 0 && (
                                    <Link
                                        href={`/subjects/${item.subject._id}`}
                                        className="group flex min-h-[190px] flex-col items-center justify-center rounded-2xl bg-[#2B3F43] p-5 text-center text-white shadow-[0_12px_35px_rgba(43,63,67,0.22)] transition-all duration-300 hover:-translate-y-2 hover:bg-[#223438]"
                                    >
                                        <div className="text-5xl transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </div>

                                        <h4 className="mt-4 text-xl font-bold">
                                            View All
                                        </h4>

                                        <p className="mt-2 text-sm text-white/70">
                                            {item.subject.title} Chapters
                                        </p>
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}

                    {chapter.length === 0 && (
                        <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center">
                            <h3 className="text-2xl font-bold text-[#2B3F43]">
                                No Subjects Found
                            </h3>

                            <p className="mt-3 text-gray-500">
                                Chapters will appear here once subjects are available.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Chapters;