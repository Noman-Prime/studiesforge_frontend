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
    const fetchChapter = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/mdcat/chapter/get/${id}`, { withCredentials: true });
            setChapter(res.data.chapter);
        } catch (e) {
            toast.error("Failed to fetch chapter");
        }
    };
    const fetchTopics = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/topic/chapter/${id}`, { withCredentials: true });
            setTopics(res.data.topic || []);
        } catch (e) {
            toast.error("Failed to fetch topics");
        }
    };
    const deleteTopic = async (tid) => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API}/api/v1/topic/delete/${tid}`, { withCredentials: true });
            toast.success(res.data.message);
            fetchTopics();
        } catch (e) {
            toast.error(e.response?.data?.message || "Failed to delete");
        }
    };
    useEffect(() => {
        if (id) { fetchChapter(); fetchTopics(); }
    }, [id]);
    return (
        <div className="min-h-screen bg-zinc-50 p-6 md:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-zinc-500 uppercase tracking-wider text-xs font-bold">
                            <LayoutDashboard size={14} /> Chapter Management
                        </div>
                        <h1 className="text-4xl font-extrabold text-zinc-900">{chapter?.title || "Loading..."}</h1>
                        <p className="mt-2 text-zinc-600">Manage, view, and organize topics for this chapter.</p>
                    </div>
                    <Link href="/admin/topic/create" className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 font-semibold text-white hover:bg-zinc-700 transition">
                        <Plus size={18} /> Create Topic
                    </Link>
                </div>
                {topics.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 bg-white p-16 text-center">
                        <div className="rounded-full bg-zinc-100 p-6 mb-4"><FileText size={40} className="text-zinc-400" /></div>
                        <h2 className="text-xl font-bold text-zinc-800">No topics found</h2>
                        <p className="mt-2 text-zinc-500">Get started by creating your first topic.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {topics.map((t, i) => (
                            <div key={t._id} className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-xl transition-all">
                                <div className="relative h-48 overflow-hidden bg-zinc-100">
                                    {t.image?.url ? (
                                        <img src={t.image.url} alt={t.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center"><FileText size={48} className="text-zinc-300" /></div>
                                    )}
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-bold text-zinc-800 shadow-sm">TOPIC {i + 1}</div>
                                </div>
                                <div className="flex flex-col flex-grow p-6">
                                    <h2 className="text-lg font-bold text-zinc-900 mb-2 line-clamp-1">{t.title}</h2>
                                    <p className="text-sm text-zinc-600 mb-6 flex-grow line-clamp-2">{t.description}</p>
                                    <div className="flex gap-2">
                                        <Link href={`/admin/topic/view/${t._id}`} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-zinc-100 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 transition">
                                            <Eye size={16} /> View
                                        </Link>
                                        <button onClick={() => deleteTopic(t._id)} className="flex items-center justify-center px-4 rounded-lg border border-red-100 text-red-600 hover:bg-red-50 transition">
                                            <Trash2 size={16} />
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