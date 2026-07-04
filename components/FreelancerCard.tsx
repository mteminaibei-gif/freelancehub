'use client';

import { Freelancer } from '@/lib/types';
import { Star } from 'lucide-react';
import Link from 'next/link';

interface FreelancerCardProps {
  freelancer: Freelancer;
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <img
            src={freelancer.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(freelancer.full_name)}`}
            alt={freelancer.full_name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{freelancer.full_name}</h3>
            <p className="text-sm text-gray-600">{freelancer.title || freelancer.role}</p>
          </div>
        </div>
      </div>

      {freelancer.bio && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{freelancer.bio}</p>}

      <div className="flex items-center justify-between mb-4">
        {freelancer.rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(freelancer.rating!)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{freelancer.rating.toFixed(1)}</span>
            {freelancer.reviews_count && (
              <span className="text-sm text-gray-600">({freelancer.reviews_count})</span>
            )}
          </div>
        )}
        {freelancer.hourly_rate && <span className="text-lg font-semibold">${freelancer.hourly_rate}/hr</span>}
      </div>

      {freelancer.skills && freelancer.skills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {freelancer.skills.slice(0, 3).map((skill, i) => (
              <span key={i} className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
            {freelancer.skills.length > 3 && (
              <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                +{freelancer.skills.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      <Link
        href={`/freelancers/${freelancer.id}`}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-2xl transition text-center block"
      >
        View Profile
      </Link>
    </div>
  );
}
