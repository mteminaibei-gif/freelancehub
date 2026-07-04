'use client';

import Link from 'next/link';
import { Users, Code, Palette, Award } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
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
            {[
              { step: 1, title: "Create Account", desc: "Sign up and tell us about your project" },
              { step: 2, title: "Post Project", desc: "Describe your project and set your budget" },
              { step: 3, title: "Receive Proposals", desc: "Get applications from qualified freelancers" },
              { step: 4, title: "Hire & Collaborate", desc: "Select freelancers and complete your project" }
            ].map((item) => (
              <div key={item.step} className="text-left">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">{item.step}</div>
                <h4 className="font-semibold text-lg">{item.title}</h4>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">Join thousands of freelancers and clients building amazing things together</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=client" className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition">
              I'm Looking to Hire
            </Link>
            <Link href="/signup?role=freelancer" className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-700 transition">
              I'm a Freelancer
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold mb-4">FreelanceHub</h3>
              <p className="text-gray-400">Connect with top freelance talent</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Clients</h4>
              <ul className="text-gray-400 space-y-2">
                <li><Link href="/freelancers" className="hover:text-white">Browse Freelancers</Link></li>
                <li><Link href="/projects/new" className="hover:text-white">Post a Project</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Freelancers</h4>
              <ul className="text-gray-400 space-y-2">
                <li><Link href="/freelancers" className="hover:text-white">Find Work</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="text-gray-400 space-y-2">
                <li><Link href="/" className="hover:text-white">About</Link></li>
                <li><Link href="/" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2026 FreelanceHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
