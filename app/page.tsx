'use client';

import Link from 'next/link';
import { Users, Code, Palette, Award } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">FH</div>
            <span className="text-2xl font-semibold tracking-tight">FreelanceHub</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#how" className="hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">Reviews</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="px-5 py-2 text-sm font-medium hover:bg-gray-100 rounded-xl transition">Sign In</Link>
            <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 text-sm font-semibold rounded-2xl transition">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
              Hire Expert<br />Freelancers for<br />Your Projects
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-md">Get high-quality help from professional freelancers in any field.</p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 transition flex items-center gap-2">
                Get Started Free
              </Link>
              <a href="#how" className="border-2 border-gray-300 hover:border-gray-400 px-8 py-4 rounded-2xl font-semibold text-lg transition">Watch Demo</a>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border">
              <img src="https://picsum.photos/id/1015/600/400" alt="Freelancer working" className="rounded-2xl shadow" />
              <div className="flex justify-between mt-6 text-sm">
                <div>Sarah M. <span className="text-emerald-600">• Graphic Designer</span></div>
                <div className="text-emerald-600">4.98 ★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Popular Services</h2>
          <p className="text-center text-gray-600 mb-12">Expert talent ready for your next project</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Essay Writing", desc: "Expert writers for your academic needs." },
              { icon: Code, title: "Web Development", desc: "Skilled developers for your web projects." },
              { icon: Palette, title: "Graphic Design", desc: "Creative designers for your visuals." }
            ].map((service, i) => (
              <div key={i} className="border border-gray-100 hover:border-blue-200 p-8 rounded-3xl transition group">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8 mt-16">
            {[1,2,3,4].map((step) => (
              <div key={step} className="text-left">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">{step}</div>
                <h4 className="font-semibold text-lg">Step {step}</h4>
                <p className="text-gray-600 mt-2">Description for step {step}...</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>© 2026 FreelanceHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
