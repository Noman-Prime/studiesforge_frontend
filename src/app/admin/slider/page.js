"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Plus, ArrowUpRight, Loader2, Images } from "lucide-react";
import { toast } from "sonner";

const Slider = () => {
    const [sliders, setSliders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSliders = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/api/v1/slider/get/all`,
                { withCredentials: true }
            );
            setSliders(data.slider || []);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch sliders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSliders();
    }, []);

    if (loading) return (
        <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#2B3F43]" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-[#2B3F43]">Sliders</h1>
                        <p className="mt-2 text-gray-600">Manage your homepage hero sliders.</p>
                    </div>
                    <Link
                        href="/admin/slider/create"
                        className="flex items-center gap-2 rounded-xl bg-[#2B3F43] px-5 py-3 text-white transition hover:opacity-90"
                    >
                        <Plus size={18} /> Create Slider
                    </Link>
                </div>

                {sliders.length === 0 ? (
                    <div className="rounded-2xl bg-white p-20 text-center border border-dashed border-gray-300">
                        <Images size={48} className="mx-auto mb-4 text-gray-300" />
                        <h2 className="text-xl font-semibold text-gray-700">No Sliders Found</h2>
                        <p className="text-gray-500 mt-1">Get started by creating your first slider.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {sliders.map((slider) => (
                            <Link
                                key={slider._id}
                                href={`/admin/slider/${slider._id}`}
                                className="group overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <img
                                    src={slider.image?.url}
                                    alt="Slider"
                                    className="h-56 w-full object-cover"
                                />
                                <div className="p-5">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-bold text-[#2B3F43]">Slider {slider._id.slice(-6)}</h2>
                                        <ArrowUpRight size={20} className="text-gray-400 group-hover:text-[#2B3F43]" />
                                    </div>
                                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                                        {slider.description || "No description provided."}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Slider;