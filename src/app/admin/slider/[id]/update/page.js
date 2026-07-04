"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";

const UpdateSlider = () => {
    const { id } = useParams();
    const router = useRouter();
    const fileRef = useRef(null);

    const [data, setData] = useState({ image: null, description: "" });
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getSlider = async () => {
        try {
            const { data: res } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/slider/get/${id}`, { withCredentials: true });
            setData({ image: null, description: res.slider.description });
            setPreview(res.slider.image?.url || null);
        } catch (error) {
            toast.error("Failed to fetch slider details");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) getSlider();
    }, [id]);

    useEffect(() => {
        return () => {
            if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const changeData = (e) => {
        const { name, value, files, type } = e.target;
        if (type === "file") {
            const file = files[0];
            setData((prev) => ({ ...prev, image: file }));
            if (file) {
                if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
                setPreview(URL.createObjectURL(file));
            }
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const updateSlider = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            if (data.image) formData.append("image", data.image);
            formData.append("description", data.description);

            const { data: res } = await axios.put(`${process.env.NEXT_PUBLIC_API}/api/v1/slider/update/${id}`, formData, { withCredentials: true });

            if (res.success) {
                toast.success(res.message);
                router.push(`/admin/slider/${id}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="animate-spin text-[#2B3F43]" /></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="mx-auto max-w-4xl px-6">
                <button onClick={() => router.back()} className="mb-6 flex items-center text-gray-600 hover:text-[#2B3F43]">
                    <ArrowLeft size={20} className="mr-2" /> Back
                </button>

                <form onSubmit={updateSlider} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="bg-[#2B3F43] px-8 py-5">
                        <h2 className="text-2xl font-semibold text-white">Update Slider</h2>
                    </div>

                    <div className="space-y-8 p-8">
                        <div>
                            <label className="mb-3 block font-semibold text-[#2B3F43]">Slider Image</label>
                            {preview && <img src={preview} alt="Preview" className="mb-4 h-64 w-full rounded-xl border object-cover" />}
                            <input ref={fileRef} type="file" accept="image/*" onChange={changeData} className="w-full rounded-xl border p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-[#2B3F43] file:px-5 file:py-2 file:text-white" />
                        </div>

                        <div>
                            <label className="mb-3 block font-semibold text-[#2B3F43]">Description</label>
                            <textarea name="description" value={data.description} onChange={changeData} rows={6} className="w-full rounded-xl border p-4 outline-none focus:border-[#2B3F43]" />
                        </div>

                        <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2B3F43] px-8 py-4 font-semibold text-white transition hover:opacity-90 disabled:opacity-70">
                            {isSubmitting ? <><Loader2 className="animate-spin" /> Updating...</> : "Update Slider"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateSlider;