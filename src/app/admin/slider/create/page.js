"use client";

import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";

const CreateSlider = () => {
    const fileRef = useRef(null);
    const [data, setData] = useState({ image: null, description: "" });
    const [preview, setPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Cleanup preview URL on unmount
    useEffect(() => {
        return () => preview && URL.revokeObjectURL(preview);
    }, [preview]);

    const changeData = (e) => {
        const { name, value, files, type } = e.target;

        if (type === "file") {
            const file = files[0];
            setData((prev) => ({ ...prev, image: file }));
            setPreview(file ? URL.createObjectURL(file) : null);
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const createSlider = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("image", data.image);
            formData.append("description", data.description);

            const { data: res } = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/api/v1/slider/create`,
                formData,
                { withCredentials: true }
            );

            if (res.success) {
                toast.success(res.message);
                setData({ image: null, description: "" });
                setPreview(null);
                if (fileRef.current) fileRef.current.value = "";
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create slider");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="mx-auto max-w-4xl px-6">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[#2B3F43]">Create Slider</h1>
                    <p className="mt-2 text-gray-600">Upload a new homepage slider.</p>
                </div>

                <form onSubmit={createSlider} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="bg-[#2B3F43] px-8 py-5">
                        <h2 className="text-2xl font-semibold text-white">Slider Information</h2>
                    </div>

                    <div className="space-y-8 p-8">
                        <div>
                            <label className="mb-3 block font-semibold text-[#2B3F43]">Slider Image</label>
                            {preview && (
                                <img src={preview} alt="Preview" className="mb-4 h-64 w-full rounded-xl border object-cover" />
                            )}
                            <input 
                                ref={fileRef} 
                                type="file" 
                                name="image" 
                                accept="image/*" 
                                onChange={changeData} 
                                className="w-full rounded-xl border p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-[#2B3F43] file:px-5 file:py-2 file:text-white" 
                            />
                        </div>

                        <div>
                            <label className="mb-3 block font-semibold text-[#2B3F43]">Description</label>
                            <textarea 
                                name="description" 
                                value={data.description} 
                                onChange={changeData} 
                                rows={6} 
                                placeholder="Enter slider description..." 
                                className="w-full rounded-xl border p-4 outline-none focus:border-[#2B3F43]" 
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting} 
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2B3F43] px-8 py-4 font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : <Upload size={18} />}
                            {isSubmitting ? "Creating..." : "Create Slider"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSlider;