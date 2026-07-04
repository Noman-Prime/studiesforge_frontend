"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const SubjectChapter = () => {
    const { id } = useParams();
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchChapters = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/mdcat/chapter/subject/${id}`,
                {
                    withCredentials: true,
                    headers: { "Cache-Control": "no-cache" },
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
                `${process.env.NEXT_PUBLIC_API}/mdcat/chapter/delete/${chapterId}`,
                { withCredentials: true }
            );
            if (result.data.success) {
                toast.success("Chapter deleted successfully");
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
        const handleFocus = () => fetchChapters();
        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="text-gray-500">Loading...</span>
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
                            Manage and organize all chapters of this subject.
                        </p>
                    </div>

                    <Link
                        href="/admin/chapter/create"
                        className="flex items-center gap-2 rounded-xl bg-[#2B3F43] px-5 py-3 text-white transition hover:opacity-90"
                    >
                        <Plus size={18} />
                        Create Chapter
                    </Link>
                </div>

                {chapters.length === 0 ? (
                    <div className="rounded-2xl bg-white p-10 text-center shadow">
                        <BookOpen size={60} className="mx-auto text-gray-300" />
                        <h2 className="mt-4 text-xl font-semibold text-gray-700">
                            No Chapters Found
                        </h2>
                        <p className="mt-2 text-gray-500">
                            Create your first chapter to get started.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {chapters.map((chapter) => (
                            <div
                                key={chapter._id}
                                className="group overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                            >
                                <div className="p-5">
                                    <span className="text-xs font-semibold text-[#2B3F43] bg-[#2B3F43]/10 px-3 py-1 rounded-full">
                                        Chapter {chapter.number}
                                    </span>
                                    
                                    <h2 className="mt-4 text-xl font-bold text-[#2B3F43]">
                                        {chapter.title}
                                    </h2>

                                    <p className="mt-2 line-clamp-2 text-gray-600">
                                        {chapter.description}
                                    </p>

                                    <div className="mt-5 flex gap-2">
                                        <Link
                                            href={`/admin/chapter/update/${chapter._id}`}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => deleteChapter(chapter._id)}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>

                                        <Link
                                            href={`/admin/topic/${chapter._id}`}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#2B3F43] py-2.5 text-sm font-semibold text-white transition hover:bg-[#223438]"
                                        >
                                            <BookOpen size={16} />
                                            Open
                                        </Link>
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

export default SubjectChapter;