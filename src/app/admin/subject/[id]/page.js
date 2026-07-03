"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { ArrowRight, Plus } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const SubjectChaptr = () => {
    const { id } = useParams();
    const [chapters, setChapters] = useState([]);

    const fetchChapters = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/mdcat/chapter/subject/${id}`,
                { withCredentials: true }
            );

            setChapters(res.data.chapter || []);
        } catch (error) {
            console.log(error.response?.data?.message);
            toast.error("Failed to fetch chapters");
        }
    };

    useEffect(() => {
        if (id) fetchChapters();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl p-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-[#2B3F43]">
                            Subject Chapters
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Browse and manage all chapters of this subject.
                        </p>
                    </div>

                    <button className="flex items-center gap-2 rounded-xl bg-[#2B3F43] px-5 py-3 text-white transition hover:opacity-90">
                        <Plus size={18} />
                        Create Chapter
                    </button>
                </div>

                {chapters.length === 0 ? (
                    <div className="rounded-2xl bg-white p-10 text-center shadow">
                        <h2 className="text-xl font-semibold text-gray-700">
                            No Chapters Found
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Create your first chapter to get started.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {chapters.map((chapter, index) => (
                            <div
                                key={chapter._id}
                                className="group overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                            >
                                <div className="p-6">
                                    <span className="rounded-full bg-[#2B3F43]/10 px-3 py-1 text-xs font-semibold text-[#2B3F43]">
                                        Chapter {index + 1}
                                    </span>

                                    <h2 className="mt-4 text-xl font-bold text-[#2B3F43] line-clamp-2">
                                        {chapter.title}
                                    </h2>

                                    <p className="mt-3 line-clamp-3 text-gray-600">
                                        {chapter.description}
                                    </p>

                                    <Link
                                        href={`/admin/topic/${chapter._id}`}
                                        className="mt-6 flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 transition hover:border-[#2B3F43] hover:bg-gray-50"
                                    >
                                        <span className="font-medium text-[#2B3F43]">
                                            View Topics
                                        </span>

                                        <ArrowRight
                                            size={20}
                                            className="text-[#2B3F43] transition group-hover:translate-x-1"
                                        />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubjectChaptr;