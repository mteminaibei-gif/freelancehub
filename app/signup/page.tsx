'use client';
export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Join FreelanceHub</h1>
        {/* Form would connect to Supabase here */}
        <div className="space-y-6">
          <input type="text" placeholder="Full Name" className="w-full p-4 border rounded-2xl" />
          <input type="email" placeholder="Email" className="w-full p-4 border rounded-2xl" />
          <input type="password" placeholder="Password" className="w-full p-4 border rounded-2xl" />
          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold">Create Account</button>
        </div>
      </div>
    </div>
  );
}
