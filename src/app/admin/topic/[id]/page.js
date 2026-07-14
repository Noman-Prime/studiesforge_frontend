"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { FileText, Plus, Trash2, Eye, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";

const Topic = () => {
    const { id } = useParams();

    const [chapter, setChapter] = useState(null);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchChapter = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/mdcat/chapter/get/${id}`,
                { withCredentials: true }
            );

            if (res.data?.chapter) {
                setChapter(res.data.chapter);
            } else {
                setChapter(null);
            }

        } catch (e) {
            setChapter(null);
        }
    };



    const fetchTopics = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/api/v1/topic/chapter/${id}`,
                { withCredentials: true }
            );

            if (res.data?.topic) {
                setTopics(res.data.topic);
            } else {
                setTopics([]);
            }

        } catch (e) {
            setTopics([]);
        }
    };



    const deleteTopic = async (tid) => {
        try {

            const res = await axios.delete(
                `${process.env.NEXT_PUBLIC_API}/api/v1/topic/delete/${tid}`,
                { withCredentials: true }
            );

            toast.success(res.data.message);
            fetchTopics();

        } catch (e) {

            toast.error(
                e.response?.data?.message || "Failed to delete topic"
            );

        }
    };



    useEffect(() => {

        if (id) {

            const loadData = async () => {

                setLoading(true);

                await Promise.all([
                    fetchChapter(),
                    fetchTopics()
                ]);

                setLoading(false);

            };

            loadData();

        }

    }, [id]);



    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50">
                <p className="text-zinc-500">
                    Loading...
                </p>
            </div>
        );

    }



    return (
        <div className="min-h-screen bg-zinc-50 p-6 md:p-8">

            <div className="mx-auto max-w-7xl">


                <div className="flex flex-col gap-6 mb-10 md:flex-row md:items-center md:justify-between">


                    <div>

                        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">

                            <LayoutDashboard size={14} />

                            Chapter Management

                        </div>



                        <h1 className="text-4xl font-extrabold text-zinc-900">

                            {chapter?.title || "No data found"}

                        </h1>



                        <p className="mt-2 text-zinc-600">

                            Manage, view, and organize topics for this chapter.

                        </p>


                    </div>



                    {chapter && (

                        <Link
                            href="/admin/topic/create"
                            className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 font-semibold text-white transition hover:bg-zinc-700"
                        >

                            <Plus size={18} />

                            Create Topic

                        </Link>

                    )}


                </div>




                {!chapter ? (

                    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 bg-white p-16 text-center">

                        <div className="mb-4 rounded-full bg-zinc-100 p-6">

                            <FileText size={40} className="text-zinc-400" />

                        </div>


                        <h2 className="text-xl font-bold text-zinc-800">
                            No data found
                        </h2>


                        <p className="mt-2 text-zinc-500">
                            This chapter does not exist.
                        </p>


                    </div>


                ) : topics.length === 0 ? (


                    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 bg-white p-16 text-center">


                        <div className="mb-4 rounded-full bg-zinc-100 p-6">

                            <FileText size={40} className="text-zinc-400" />

                        </div>


                        <h2 className="text-xl font-bold text-zinc-800">
                            No topics found
                        </h2>


                        <p className="mt-2 text-zinc-500">
                            Create your first topic for this chapter.
                        </p>


                    </div>


                ) : (


                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">


                        {topics.map((t, i) => (


                            <div
                                key={t._id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-xl"
                            >


                                <div className="relative h-48 overflow-hidden bg-zinc-100">


                                    {t.image?.url ? (

                                        <img
                                            src={t.image.url}
                                            alt={t.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                    ) : (

                                        <div className="flex h-full items-center justify-center">

                                            <FileText size={48} className="text-zinc-300" />

                                        </div>

                                    )}



                                    <div className="absolute left-3 top-3 rounded-lg bg-white/90 px-3 py-1 text-[10px] font-bold text-zinc-800 shadow-sm">

                                        TOPIC {i + 1}

                                    </div>


                                </div>




                                <div className="flex flex-grow flex-col p-6">


                                    <h2 className="mb-2 line-clamp-1 text-lg font-bold text-zinc-900">

                                        {t.title}

                                    </h2>



                                    <p className="mb-6 line-clamp-2 flex-grow text-sm text-zinc-600">

                                        {t.description}

                                    </p>




                                    <div className="grid grid-cols-2 gap-2">


                                        <Link
                                            href={`/admin/topic/view/${t._id}`}
                                            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                                        >

                                            <Eye size={16} />

                                            View

                                        </Link>



                                        <button
                                            onClick={() => deleteTopic(t._id)}
                                            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                                        >

                                            <Trash2 size={16} />

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


export default Topic;