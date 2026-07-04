"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Loader2, Trash2, Replace } from "lucide-react";

const Update = () => {
  const { id } = useParams();
  const router = useRouter();
  const fileRef = useRef(null);
  const [subject, setSubject] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    image: null,
    title: "",
    description: "",
  });

  useEffect(() => {
    const getSubject = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/api/v1/subject/get/${id}`,
          { withCredentials: true }
        );
        const sub = res.data.subject;
        setSubject(sub);
        setData({ image: null, title: sub.title, description: sub.description });
        setPreview(sub.image?.url || null);
      } catch (error) {
        toast.error("Failed to fetch subject");
      }
    };
    if (id) getSubject();
  }, [id]);

  const changeData = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        setData((prev) => ({ ...prev, image: file }));
        setPreview(URL.createObjectURL(file));
      }
      return;
    }
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const removeImage = () => {
    setPreview(null);
    setData((prev) => ({ ...prev, image: null }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const updateSubject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.image) formData.append("image", data.image);
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/api/v1/subject/update/${id}`,
        formData,
        { withCredentials: true }
      );
      toast.success(res.data?.message || "Subject updated successfully");
      router.push("/admin/subject");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update subject");
    } finally {
      setLoading(false);
    }
  };

  if (!subject) return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Loader2 className="animate-spin text-[#2B3F43]" size={40} />
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#2B3F43]">Update Subject</h1>
          <p className="mt-2 text-gray-600">Modify your existing subject details below.</p>
        </div>
        <form onSubmit={updateSubject} className="w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div className="bg-[#2B3F43] px-8 py-6">
            <h2 className="text-2xl font-semibold text-white">Subject Information</h2>
          </div>
          <div className="grid w-full gap-10 p-8 lg:grid-cols-2">
            <div className="w-full">
              <label className="mb-3 block font-semibold text-[#2B3F43]">Subject Image</label>
              <div className="w-full overflow-hidden rounded-2xl border border-dashed border-gray-300 bg-gray-50">
                <div className="flex h-80 w-full items-center justify-center bg-gray-100">
                  {preview ? (
                    <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-lg text-gray-900">Select file</span>
                  )}
                </div>
                {/* File Input Container */}
                <div className="border-t p-5 flex gap-3">
                  <input ref={fileRef} type="file" name="image" accept="image/*" onChange={changeData} className="hidden" />
                  <button type="button" onClick={removeImage} className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-red-500 py-3 text-red-500 hover:bg-red-50 transition">
                    <Trash2 size={18} /> Remove
                  </button>
                  <button type="button" onClick={() => fileRef.current?.click()} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#2B3F43] py-3 text-white transition hover:opacity-90">
                    <Replace size={18} /> Replace
                  </button>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col space-y-6">
              <div>
                <label className="mb-2 block font-semibold text-[#2B3F43]">Subject Title</label>
                <input type="text" name="title" value={data.title} onChange={changeData} className="w-full rounded-xl text-gray-900 border border-gray-300 p-4 outline-none transition focus:border-[#2B3F43]" />
              </div>
              <div className="flex-grow">
                <label className="mb-2 block font-semibold text-[#2B3F43]">Description</label>
                <textarea name="description" value={data.description} onChange={changeData} rows={9} className="w-full resize-none rounded-xl text-gray-900 border border-gray-300 p-4 outline-none transition focus:border-[#2B3F43]" />
              </div>
              <div className="flex justify-end pt-4">
                <button type="submit" disabled={loading} className="flex items-center gap-2 rounded-xl bg-[#2B3F43] px-8 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "Update Subject"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;