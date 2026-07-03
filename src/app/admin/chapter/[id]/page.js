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
    const [loading, setLoading] = useState(true);

    const fetchChapters = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `http://localhost:5000/mdcat/chapter/subject/${id}`,
                {
                    withCredentials: true,
                    headers: {
                        "Cache-Control": "no-cache",
                    },
                }
            );

            setChapters(res.data.chapter || []);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch chapters");
        } finally {
            setLoading(false);
        }
    };

    const deleteChapter = async (chapterId) => {
        try {
            const result = await axios.delete(
                `http://localhost:5000/mdcat/chapter/delete/${chapterId}`,
                {
                    withCredentials: true,
                }
            );

            if (result.data.success) {
                toast.success("Chapter deleted");

                // Refresh list after delete
                fetchChapters();
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete chapter");
        }
    };

    useEffect(() => {
        if (!id) return;

        fetchChapters();

        // Refresh when user returns to this page
        const handleFocus = () => {
            fetchChapters();
        };

        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("focus", handleFocus);
        };
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

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

                    <Link
                        href="/admin/chapter/create"
                        className="flex items-center gap-2 rounded-xl bg-[#2B3F43] px-5 py-3 text-white hover:opacity-90"
                    >
                        <Plus size={18} />
                        Create Chapter
                    </Link>
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
                                className="group overflow-hidden rounded-2xl bg-white shadow-lg hover:-translate-y-2 hover:shadow-2xl transition"
                            >
                                <div className="p-6 flex flex-col h-full">
                                    <span className="w-fit rounded-full bg-[#2B3F43]/10 px-3 py-1 text-xs font-semibold text-[#2B3F43]">
                                        Chapter {chapter.number}
                                    </span>

                                    <h2 className="mt-4 text-xl font-bold text-[#2B3F43]">
                                        {chapter.title}
                                    </h2>

                                    <p className="mt-3 text-gray-600 flex-1">
                                        {chapter.description}
                                    </p>

                                    <Link
                                        href={`/admin/topic/${chapter._id}`}
                                        className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 hover:border-[#2B3F43]"
                                    >
                                        <span className="font-medium text-[#2B3F43]">
                                            View Topics
                                        </span>

                                        <ArrowRight size={20} />
                                    </Link>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <Link
                                            href={`/admin/chapter/update/${chapter._id}`}
                                            className="rounded-xl bg-blue-600 py-2.5 text-center text-white hover:bg-blue-700"
                                        >
                                            Update
                                        </Link>

                                        <button
                                            onClick={() => deleteChapter(chapter._id)}
                                            className="rounded-xl bg-red-600 py-2.5 text-white hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
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