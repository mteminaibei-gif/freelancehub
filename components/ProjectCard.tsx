'use client';

import { Project } from '@/lib/types';
import { DollarSign, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusColors = {
    open: 'bg-green-100 text-green-700',
    in_progress: 'bg-blue-100 text-blue-700',
    completed: 'bg-gray-100 text-gray-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-4 ${statusColors[project.status]}`}>
          {project.status}
        </span>
      </div>

      <div className="space-y-2 mb-4 text-sm text-gray-600">
        {project.budget_min && project.budget_max && (
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>${project.budget_min} - ${project.budget_max}</span>
          </div>
        )}
        {project.deadline && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(project.deadline).toLocaleDateString()}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span className="capitalize">{project.category}</span>
        </div>
      </div>

      {project.required_skills && project.required_skills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.required_skills.slice(0, 3).map((skill, i) => (
              <span key={i} className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <Link
        href={`/projects/${project.id}`}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-2xl transition text-center block"
      >
        View Details
      </Link>
    </div>
  );
}
