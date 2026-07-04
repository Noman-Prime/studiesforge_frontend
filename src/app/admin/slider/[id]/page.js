"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Pencil, Trash2, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ViewSlider = () => {
    const { id } = useParams();
    const router = useRouter();

    const [slider, setSlider] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    const getSlider = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/slider/get/${id}`, { withCredentials: true });
            setSlider(data.slider);
        } catch (error) {
            toast.error("Failed to fetch slider details");
        } finally {
            setLoading(false);
        }
    };

    const deleteSlider = async () => {
        if (!window.confirm("Are you sure you want to delete this slider? This action cannot be undone.")) return;

        setIsDeleting(true);
        try {
            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API}/api/v1/slider/delete/${id}`, { withCredentials: true });
            toast.success(data.message);
            router.push("/admin/slider");
        } catch (error) {
            toast.error(error.response?.data?.message || "Delete failed");
        } finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        if (id) getSlider();
    }, [id]);

    if (loading) return (
        <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#2B3F43]" />
        </div>
    );

    if (!slider) return <div className="p-10 text-center">Slider not found.</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="mx-auto max-w-4xl px-6">
                <button onClick={() => router.back()} className="mb-6 flex items-center text-gray-600 hover:text-[#2B3F43]">
                    <ArrowLeft size={20} className="mr-2" /> Back
                </button>

                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="bg-[#2B3F43] px-8 py-5">
                        <h2 className="text-2xl font-semibold text-white">Slider Details</h2>
                    </div>

                    <img src={slider.image?.url} alt="Slider" className="h-80 w-full object-cover" />

                    <div className="space-y-6 p-8">
                        <div>
                            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-400">Description</h3>
                            <p className="leading-relaxed text-gray-700">{slider.description}</p>
                        </div>

                        <div className="flex gap-4 pt-4 border-t">
                            <button 
                                onClick={() => router.push(`/admin/slider/${id}/update`)}
                                className="flex items-center gap-2 rounded-xl bg-gray-100 px-6 py-3 font-semibold text-[#2B3F43] transition hover:bg-gray-200"
                            >
                                <Pencil size={18} /> Edit
                            </button>

                            <button
                                onClick={deleteSlider}
                                disabled={isDeleting}
                                className="flex items-center gap-2 rounded-xl bg-red-50 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                            >
                                {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewSlider;