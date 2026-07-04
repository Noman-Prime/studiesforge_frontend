"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";
import { toast } from "sonner";

const Subject = () => {
    const [subjects, setSubjects] = useState([]);

    const fetchSubjects = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/api/v1/subject/all`,
                { withCredentials: true }
            );
            setSubjects(data.subject);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    const deleteSubject = async (id) => {
        try {
            const { data } = await axios.delete(
                `${process.env.NEXT_PUBLIC_API}/api/v1/subject/delete/${id}`,
                { withCredentials: true }
            );
            if (data.success) {
                toast.success("Subject deleted successfully");
                fetchSubjects();
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="mx-auto max-w-7xl p-4 sm:p-8">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#2B3F43]">Subjects</h1>
                        <p className="mt-1 text-gray-600">Manage and organize all MDCAT subjects.</p>
                    </div>
                    <Link
                        href="/admin/subject/create"
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#2B3F43] px-6 py-3 text-white transition hover:bg-[#1e2d30] font-semibold"
                    >
                        <Plus size={20} />
                        Create Subject
                    </Link>
                </div>

                {subjects.length === 0 ? (
                    <div className="rounded-3xl bg-white border border-dashed border-gray-300 p-12 text-center shadow-sm">
                        <BookOpen size={60} className="mx-auto text-gray-300 mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800">No Subjects Found</h2>
                        <p className="mt-2 text-gray-500">Create your first subject to get started.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {subjects.map((subject) => (
                            <div
                                key={subject._id}
                                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={subject.image?.url}
                                        alt={subject.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h2 className="text-xl font-bold text-[#2B3F43] truncate">{subject.title}</h2>
                                    <p className="mt-2 flex-grow text-sm text-gray-600 line-clamp-2">{subject.description}</p>
                                    <div className="mt-6 flex gap-2">
                                        <Link
                                            href={`/admin/subject/${subject._id}/update`}
                                            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gray-100 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition"
                                        >
                                            <Pencil size={16} /> Edit
                                        </Link>
                                        <button
                                            onClick={() => deleteSubject(subject._id)}
                                            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-red-50 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 transition"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>
                                    <Link
                                        href={`/admin/chapter/${subject._id}`}
                                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2B3F43] py-2.5 text-sm font-semibold text-white hover:bg-[#1e2d30] transition"
                                    >
                                        <BookOpen size={16} /> Open
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

export default Subject;