"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, ArrowRight, ShieldCheck } from "lucide-react";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/password/reset/request",
        { email }
      );
      toast.success(data.message || "Reset link sent to your email");
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#2B3F43] p-6 sm:p-8 text-white">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <ShieldCheck size={30} />
          </div>
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-white/80 mt-1 text-sm">
            Enter your email to receive a secure reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="flex items-center h-12 border border-gray-300 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-[#2B3F43] focus-within:border-transparent transition">
              <Mail className="ml-3 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-full bg-transparent outline-none px-3 text-base"
                placeholder="admin@studiesforge.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#2B3F43] text-white font-semibold hover:bg-[#203033] transition disabled:opacity-70 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading ? "Sending..." : "Send Reset Link"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 border-t px-8 py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} StudiesForge Admin Panel
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;