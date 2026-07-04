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
            const result = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/api/v1/subject/all`,
                { withCredentials: true }
            );

            setSubjects(result.data.subject)
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message);
        }
    };
    const deleteSubject = async (id) => {
        try {
            const result = await axios.delete(`${process.env.NEXT_PUBLIC_API}/api/v1/subject/delete/${id}`, { withCredentials: true })
            if (result.data.success) {
                toast.success("Subject deleted successfully");
                fetchSubjects();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message)
        }
    }

    useEffect(() => {
        fetchSubjects();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl p-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-[#2B3F43]">
                            Subjects
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Manage and organize all MDCAT subjects.
                        </p>
                    </div>

                    <Link
                        href="/admin/subject/create"
                        className="flex items-center gap-2 rounded-xl bg-[#2B3F43] px-5 py-3 text-white transition hover:opacity-90"
                    >
                        <Plus size={18} />
                        Create Subject
                    </Link>
                </div>

                {subjects.length === 0 ? (
                    <div className="rounded-2xl bg-white p-10 text-center shadow">
                        <BookOpen size={60} className="mx-auto text-gray-300" />
                        <h2 className="mt-4 text-xl font-semibold text-gray-700">
                            No Subjects Found
                        </h2>
                        <p className="mt-2 text-gray-500">
                            Create your first subject to get started.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {subjects.map((subject) => (
                            <div
                                key={subject._id}
                                className="group overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                            >
                                <img
                                    src={subject.image?.url || "/placeholder.jpg"}
                                    alt={subject.title}
                                    className="h-56 w-full object-cover"
                                />

                                <div className="p-5">
                                    <h2 className="text-xl font-bold text-[#2B3F43]">
                                        {subject.title}
                                    </h2>

                                    <p className="mt-2 line-clamp-2 text-gray-600">
                                        {subject.description}
                                    </p>

                                    <div className="mt-5 flex gap-2">
                                        <Link
                                            href={`/admin/subject/update/${subject._id}`}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => (deleteSubject(subject._id))}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>

                                        <Link
                                            href={`/admin/chapter/${subject._id}`}
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

export default Subject;