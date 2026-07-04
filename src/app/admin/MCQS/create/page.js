"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, PlusCircle } from "lucide-react";

const Create = () => {
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [topics, setTopics] = useState([]);

    const [formData, setFormData] = useState({
        subjectId: "",
        chapterId: "",
        topicId: "",
        statement: "",
        options: { A: "", B: "", C: "", D: "" },
        correctOption: "",
        reason: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const getSubjects = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/subject/all`, { withCredentials: true });
            setSubjects(data.subject);
        } catch (error) {
            toast.error("Failed to load subjects");
        }
    };

    const getChapters = async (id) => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/mdcat/chapter/subject/${id}`, { withCredentials: true });
            setChapters(data.chapter);
        } catch (error) {
            toast.error("Failed to load chapters");
        }
    };

    const getTopics = async (id) => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/topic/chapter/${id}`, { withCredentials: true });
            setTopics(data.topic);
        } catch (error) {
            toast.error("Failed to load topics");
        }
    };

    const createMCQ = async (e) => {
        e.preventDefault();
        
        // Basic Validation
        if (!formData.subjectId || !formData.chapterId || !formData.topicId || !formData.statement || !formData.correctOption) {
            return toast.error("Please fill in all required fields");
        }

        setIsSubmitting(true);
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API}/api/v1/mcqs/create`,
                {
                    subject: formData.subjectId,
                    chapter: formData.chapterId,
                    topic: formData.topicId,
                    statement: formData.statement,
                    options: Object.entries(formData.options).map(([id, text]) => ({ id, text })),
                    correctOption: formData.correctOption,
                    reason: formData.reason,
                },
                { withCredentials: true }
            );

            toast.success("MCQ created successfully!");
            // Reset form
            setFormData({
                subjectId: "",
                chapterId: "",
                topicId: "",
                statement: "",
                options: { A: "", B: "", C: "", D: "" },
                correctOption: "",
                reason: "",
            });
        } catch (error) {
            toast.error("Failed to create MCQ. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => { getSubjects(); }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Create New MCQ</h1>
                    <p className="text-gray-500">Fill in the details below to add a new question to the database.</p>
                </div>

                <form onSubmit={createMCQ} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    {/* Dropdowns */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <select value={formData.subjectId} onChange={(e) => { setFormData({...formData, subjectId: e.target.value}); getChapters(e.target.value); }} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select Subject</option>
                            {subjects.map(s => <option key={s._id} value={s._id}>{s.title}</option>)}
                        </select>
                        
                        <select value={formData.chapterId} onChange={(e) => { setFormData({...formData, chapterId: e.target.value}); getTopics(e.target.value); }} disabled={!formData.subjectId} className="w-full p-3 border rounded-lg disabled:bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select Chapter</option>
                            {chapters.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                        </select>

                        <select value={formData.topicId} onChange={(e) => setFormData({...formData, topicId: e.target.value})} disabled={!formData.chapterId} className="w-full p-3 border rounded-lg disabled:bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select Topic</option>
                            {topics.map(t => <option key={t._id} value={t._id}>{t.title}</option>)}
                        </select>
                    </div>

                    <textarea rows={3} value={formData.statement} onChange={(e) => setFormData({...formData, statement: e.target.value})} placeholder="Enter question statement..." className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500" required />

                    {/* Options Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {['A', 'B', 'C', 'D'].map((opt) => (
                            <input key={opt} type="text" placeholder={`Option ${opt}`} value={formData.options[opt]} onChange={(e) => setFormData({...formData, options: {...formData.options, [opt]: e.target.value}})} className="p-3 border rounded-lg" required />
                        ))}
                    </div>

                    <select value={formData.correctOption} onChange={(e) => setFormData({...formData, correctOption: e.target.value})} className="w-full p-3 border rounded-lg font-semibold text-green-700 bg-green-50" required>
                        <option value="">Select Correct Option</option>
                        {['A', 'B', 'C', 'D'].map(opt => <option key={opt} value={opt}>Option {opt}</option>)}
                    </select>

                    <textarea rows={2} value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} placeholder="Explanation..." className="w-full p-4 border rounded-lg" />

                    <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2">
                        {isSubmitting ? <Loader2 className="animate-spin" /> : <PlusCircle size={20} />}
                        {isSubmitting ? "Creating..." : "Create MCQ"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create;