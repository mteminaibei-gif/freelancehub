'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Freelancer, Review } from '@/lib/types';
import { Star, MapPin } from 'lucide-react';

export default function FreelancerProfile({ params }: { params: { id: string } }) {
  const { id } = params;
  const [freelancer, setFreelancer] = useState<Freelancer | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchFreelancer();
    fetchReviews();
  }, [id]);

  async function fetchFreelancer() {
    const { data } = await supabase.from('profiles').select('*').eq('id', id).single();
    setFreelancer(data);
    setLoading(false);
  }

  async function fetchReviews() {
    const { data } = await supabase.from('reviews').select('*').eq('reviewee_id', id).order('created_at', { ascending: false });
    setReviews(data || []);
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!freelancer) return <div>Freelancer not found</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-10 shadow">
            {/* Profile Header */}
            <div className="md:flex gap-12">
              <img 
                src={freelancer.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(freelancer.full_name)}`} 
                className="w-48 h-48 rounded-3xl object-cover" 
                alt={freelancer.full_name} 
              />
              <div className="flex-1 mt-6 md:mt-0">
                <h1 className="text-4xl font-bold">{freelancer.full_name}</h1>
                <p className="text-2xl text-gray-600 mt-1">{freelancer.title}</p>
                {freelancer.hourly_rate && <p className="text-3xl font-semibold text-blue-600 mt-4">${freelancer.hourly_rate}/hr</p>}
                
                {freelancer.bio && <p className="mt-8 text-lg text-gray-700 leading-relaxed">{freelancer.bio}</p>}

                {freelancer.skills?.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-semibold mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {freelancer.skills.map((s, i) => (
                        <span key={i} className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Reviews ({reviews.length})</h2>
              {reviews.length > 0 ? (
                reviews.map((r) => (
                  <div key={r.id} className="border-t py-8">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < r.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="mt-3 text-gray-700">{r.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}