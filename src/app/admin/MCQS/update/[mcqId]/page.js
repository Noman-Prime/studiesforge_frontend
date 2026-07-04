"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Update = () => {
    const { mcqId } = useParams();

    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [topics, setTopics] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        subjectId: "",
        chapterId: "",
        topicId: "",
        statement: "",
        options: { A: "", B: "", C: "", D: "" },
        correctOption: "",
        reason: "",
    });

    const getSubjects = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/subject/all`, { withCredentials: true });
            setSubjects(data.subject);
        } catch (error) { toast.error("Failed to load subjects"); }
    };

    const getChapter = async (id) => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/mdcat/chapter/subject/${id}`, { withCredentials: true });
            setChapters(data.chapter);
        } catch (error) { toast.error("Failed to load chapters"); }
    };

    const getTopic = async (id) => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/topic/chapter/${id}`, { withCredentials: true });
            setTopics(data.topic);
        } catch (error) { toast.error("Failed to load topics"); }
    };

    const getMCQ = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/mcqs/get/${mcqId}`, { withCredentials: true });
            const m = data.mcqs;
            
            // Initial data fetch
            await getChapter(m.subject._id);
            await getTopic(m.chapter);

            setFormData({
                subjectId: m.subject._id,
                chapterId: m.chapter,
                topicId: m.topic._id,
                statement: m.statement,
                options: {
                    A: m.options[0]?.text || "",
                    B: m.options[1]?.text || "",
                    C: m.options[2]?.text || "",
                    D: m.options[3]?.text || "",
                },
                correctOption: m.correctOption,
                reason: m.reason || "",
            });
        } catch (error) {
            toast.error("Failed to load MCQ");
        } finally {
            setLoading(false);
        }
    };

    const updateMCQ = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_API}/api/v1/mcqs/update/${mcqId}`,
                {
                    ...formData,
                    options: Object.entries(formData.options).map(([id, text]) => ({ id, text }))
                },
                { withCredentials: true }
            );
            toast.success("MCQ Updated Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        getSubjects();
        if (mcqId) getMCQ();
    }, [mcqId]);

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gray-500" /></div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <form onSubmit={updateMCQ} className="mx-auto max-w-4xl bg-white p-8 rounded-2xl shadow border">
                <h1 className="text-3xl font-bold mb-6 text-[#2B3F43]">Update MCQ</h1>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <select value={formData.subjectId} onChange={(e) => { setFormData({...formData, subjectId: e.target.value}); getChapter(e.target.value); }} className="p-3 border rounded-lg">
                        {subjects.map(s => <option key={s._id} value={s._id}>{s.title}</option>)}
                    </select>
                    <select value={formData.chapterId} onChange={(e) => { setFormData({...formData, chapterId: e.target.value}); getTopic(e.target.value); }} className="p-3 border rounded-lg">
                        {chapters.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                    </select>
                    <select value={formData.topicId} onChange={(e) => setFormData({...formData, topicId: e.target.value})} className="p-3 border rounded-lg">
                        {topics.map(t => <option key={t._id} value={t._id}>{t.title}</option>)}
                    </select>
                </div>

                <textarea rows={3} value={formData.statement} onChange={(e) => setFormData({...formData, statement: e.target.value})} className="w-full p-4 border rounded-lg mb-6" />

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {['A', 'B', 'C', 'D'].map(opt => (
                        <input key={opt} value={formData.options[opt]} onChange={(e) => setFormData({...formData, options: {...formData.options, [opt]: e.target.value}})} className="p-3 border rounded-lg" placeholder={`Option ${opt}`} />
                    ))}
                </div>

                <select value={formData.correctOption} onChange={(e) => setFormData({...formData, correctOption: e.target.value})} className="w-full p-3 border rounded-lg mb-6">
                    {['A', 'B', 'C', 'D'].map(opt => <option key={opt} value={opt}>Option {opt}</option>)}
                </select>

                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#2B3F43] text-white rounded-xl flex items-center justify-center gap-2">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : "Update MCQ"}
                </button>
            </form>
        </div>
    );
};

export default Update;