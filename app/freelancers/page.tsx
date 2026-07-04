'use client';

import { Navbar } from '@/components/Navbar';
import { useFreelancers } from '@/hooks/useFreelancers';
import { FreelancerCard } from '@/components/FreelancerCard';
import { useState } from 'react';

export default function FreelancersPage() {
  const { freelancers, loading, error } = useFreelancers();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFreelancers = freelancers.filter(
    (f) =>
      f.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.skills?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Find Top Freelancers</h1>
            <p className="text-gray-600 text-lg mb-8">Hire expert freelancers for your projects</p>

            <div className="relative">
              <input
                type="text"
                placeholder="Search freelancers by name, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-600 transition"
              />
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
              Failed to load freelancers. Please try again later.
            </div>
          )}

          {!loading && !error && filteredFreelancers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No freelancers found. Try a different search.</p>
            </div>
          )}

          {!loading && !error && filteredFreelancers.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFreelancers.map((freelancer) => (
                <FreelancerCard key={freelancer.id} freelancer={freelancer} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
