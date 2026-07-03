"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const UpdateSlider = () => {
    const { id } = useParams();
    const router = useRouter();
    const fileRef = useRef(null);

    const [data, setData] = useState({
        image: null,
        description: "",
    });

    const [preview, setPreview] = useState(null);

    const getSlider = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/v1/slider/get/${id}`,
                { withCredentials: true }
            );

            setData({
                image: null,
                description: res.data.slider.description,
            });

            setPreview(res.data.slider.image?.url || null);
        } catch (error) {
            console.log(error.response?.data?.message);
            toast.error(error.response?.data?.message || "Failed to fetch slider");
        }
    };

    useEffect(() => {
        if (id) {
            getSlider();
        }
    }, [id]);

    useEffect(() => {
        return () => {
            if (preview && preview.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const changeData = (e) => {
        const { name, value, files, type } = e.target;

        if (type === "file") {
            const file = files[0];

            setData((prev) => ({
                ...prev,
                image: file,
            }));

            if (file) {
                if (preview && preview.startsWith("blob:")) {
                    URL.revokeObjectURL(preview);
                }

                setPreview(URL.createObjectURL(file));
            }
        } else {
            setData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const updateSlider = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            if (data.image) {
                formData.append("image", data.image);
            }

            formData.append("description", data.description);

            const res = await axios.put(
                `http://localhost:5000/api/v1/slider/update/${id}`,
                formData,
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                router.push(`/admin/slider/${id}`);
            }
        } catch (error) {
            console.log(error.response?.data?.message);
            toast.error(error.response?.data?.message || "Update failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="mx-auto max-w-4xl px-6">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[#2B3F43]">
                        Update Slider
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Update slider image and description.
                    </p>
                </div>

                <form
                    onSubmit={updateSlider}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg"
                >

                    <div className="bg-[#2B3F43] px-8 py-5">
                        <h2 className="text-2xl font-semibold text-white">
                            Slider Information
                        </h2>

                        <p className="mt-1 text-sm text-gray-300">
                            Edit the slider details below.
                        </p>
                    </div>

                    <div className="space-y-8 p-8">

                        <div>
                            <label className="mb-3 block font-semibold text-[#2B3F43]">
                                Current Image
                            </label>

                            {preview && (
                                <img
                                    src={preview}
                                    alt="Slider"
                                    className="mb-4 h-64 w-full rounded-xl border border-gray-300 object-cover"
                                />
                            )}

                            <input
                                ref={fileRef}
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={changeData}
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-[#2B3F43] file:px-5 file:py-2 file:text-white"
                            />
                        </div>

                        <div>
                            <label className="mb-3 block font-semibold text-[#2B3F43]">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={data.description}
                                onChange={changeData}
                                rows={6}
                                placeholder="Enter slider description..."
                                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#2B3F43]"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="rounded-xl bg-[#2B3F43] px-8 py-3 font-semibold text-white transition hover:opacity-90"
                            >
                                Update Slider
                            </button>
                        </div>

                    </div>

                </form>

            </div>
        </div>
    );
};

export default UpdateSlider;