"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

const PasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({ password: "", confirmPassword: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.password || !form.confirmPassword) return toast.error("All fields are required");
    if (form.password !== form.confirmPassword) return toast.error("Passwords do not match");

    try {
      setLoading(true);
      const token = window.location.pathname.split("/").pop();
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/user/reset-password/${token}`,
        { password: form.password }
      );
      toast.success(data.message || "Password reset successfully");
      setForm({ password: "", confirmPassword: "" });
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
          <h1 className="text-2xl font-bold">Set New Password</h1>
          <p className="text-white/80 mt-1 text-sm">
            Please enter your new secure password below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
            <div className="flex items-center h-12 border border-gray-300 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-[#2B3F43] focus-within:border-transparent transition">
              <Lock className="ml-3 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="flex-1 h-full bg-transparent outline-none px-3 text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
            <div className="flex items-center h-12 border border-gray-300 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-[#2B3F43] focus-within:border-transparent transition">
              <Lock className="ml-3 text-gray-400" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="flex-1 h-full bg-transparent outline-none px-3 text-base"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="px-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#2B3F43] text-white font-semibold hover:bg-[#203033] transition disabled:opacity-70 active:scale-[0.98]"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <div className="bg-gray-50 border-t px-8 py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} StudiesForge Admin Panel
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;