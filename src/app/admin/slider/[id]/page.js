"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const ViewSlider = () => {
    const { id } = useParams();
    const router = useRouter();

    const [slider, setSlider] = useState(null);

    const getSlider = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/v1/slider/get/${id}`,
                { withCredentials: true }
            );

            setSlider(res.data.slider);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    const deleteSlider = async () => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/v1/slider/delete/${id}`,
                { withCredentials: true }
            );

            toast.success(res.data.message);
            router.push("/admin/slider");
        } catch (error) {
            toast.error(error.response?.data?.message || "Delete failed");
        }
    };

    useEffect(() => {
        if (id) getSlider();
    }, [id]);

    if (!slider) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <h1 className="text-2xl font-semibold text-[#2B3F43]">
                    Loading...
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="mx-auto max-w-5xl px-6">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[#2B3F43]">
                        View Slider
                    </h1>

                    <p className="mt-2 text-gray-600">
                        View and manage slider details.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">

                    <div className="bg-[#2B3F43] px-8 py-5">
                        <h2 className="text-2xl font-semibold text-white">
                            Slider Information
                        </h2>
                    </div>

                    <img
                        src={slider.image?.url}
                        alt="Slider"
                        className="h-96 w-full object-cover"
                    />

                    <div className="space-y-6 p-8">

                        <div>
                            <h3 className="mb-2 text-lg font-semibold text-[#2B3F43]">
                                Description
                            </h3>

                            <p className="leading-7 text-gray-700">
                                {slider.description}
                            </p>
                        </div>

                        <div className="flex gap-4">

                            <button
                                onClick={() =>
                                    router.push(`/admin/slider/${id}/update`)
                                }
                                className="flex items-center gap-2 rounded-xl bg-[#2B3F43] px-6 py-3 text-white transition hover:opacity-90"
                            >
                                <Pencil size={18} />
                                Update
                            </button>

                            <button
                                onClick={deleteSlider}
                                className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
                            >
                                <Trash2 size={18} />
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ViewSlider;