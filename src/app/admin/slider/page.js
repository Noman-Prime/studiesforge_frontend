"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

const Slider = () => {
    const [sliders, setSliders] = useState([]);

    const fetchSliders = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/v1/slider/get/all",
                { withCredentials: true }
            );

            setSliders(res.data.slider);
        } catch (error) {
            console.log(error.response?.data?.message);
            toast.error("Failed to fetch sliders");
        }
    };

    useEffect(() => {
        fetchSliders();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl p-8">

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-[#2B3F43]">
                            Sliders
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Manage homepage sliders.
                        </p>
                    </div>

                    <Link
                        href="/admin/slider/create"
                        className="flex items-center gap-2 rounded-xl bg-[#2B3F43] px-5 py-3 text-white transition hover:opacity-90"
                    >
                        <Plus size={18} />
                        Create Slider
                    </Link>
                </div>

                {sliders.length === 0 ? (
                    <div className="rounded-2xl bg-white p-10 text-center shadow">
                        <h2 className="text-xl font-semibold text-gray-700">
                            No Sliders Found
                        </h2>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {sliders.map((slider) => (
                            <Link
                                key={slider._id}
                                href={`/admin/slider/${slider._id}`}
                                className="group overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                            >
                                <img
                                    src={slider.image?.url || "/placeholder.jpg"}
                                    alt={slider.title}
                                    className="h-56 w-full object-cover"
                                />

                                <div className="p-5">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-xl font-bold text-[#2B3F43]">
                                            {slider.title}
                                        </h2>

                                        <ArrowUpRight
                                            size={20}
                                            className="text-[#2B3F43] transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                        />
                                    </div>

                                    <p className="mt-2 line-clamp-2 text-gray-600">
                                        {slider.description}
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