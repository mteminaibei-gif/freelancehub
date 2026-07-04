'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Project, Application } from '@/lib/types';
import Link from 'next/link';
import { DollarSign, Calendar, Users } from 'lucide-react';

export default function ProjectDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const [project, setProject] = useState<Project | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    fetchProjectAndApplications();
  }, [id]);

  async function fetchProjectAndApplications() {
    const { data: projData } = await supabase.from('projects').select('*').eq('id', id).single();
    setProject(projData);

    const { data: appData } = await supabase.from('applications').select('*').eq('project_id', id);
    setApplications(appData || []);
    setLoading(false);
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading project...</div>;
  if (!project) return <div>Project not found</div>;

  const isOwner = profile?.id === project.client_id;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow p-10">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">{project.status}</span>
            </div>

            <p className="text-lg text-gray-700 mb-10 leading-relaxed">{project.description}</p>

            {/* Budget, Deadline, Skills */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {project.budget_min && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Budget</div>
                    <div className="font-semibold">${project.budget_min} - ${project.budget_max}</div>
                  </div>
                </div>
              )}
              {project.deadline && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Deadline</div>
                    <div className="font-semibold">{new Date(project.deadline).toLocaleDateString()}</div>
                  </div>
                </div>
              )}
            </div>

            {project.required_skills && project.required_skills.length > 0 && (
              <div className="mb-10">
                <h3 className="font-semibold mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {project.required_skills.map((skill, i) => (
                    <span key={i} className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {isOwner && (
              <div className="border-t pt-8">
                <h3 className="font-semibold mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5" /> Applications ({applications.length})
                </h3>
                {applications.length > 0 ? applications.map((app) => (
                  <div key={app.id} className="border rounded-2xl p-6 mb-4">
                    <p className="font-medium">Cover Letter</p>
                    <p className="text-gray-600 mt-2 whitespace-pre-wrap">{app.cover_letter}</p>
                    {app.proposed_rate && <p className="mt-4">Proposed: <span className="font-semibold">${app.proposed_rate}</span></p>}
                  </div>
                )) : <p className="text-gray-500">No applications yet.</p>}
              </div>
            )}

            {!isOwner && project.status === 'open' && (
              <Link href={`/projects/${id}/apply`} className="mt-8 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition">
                Apply to this Project
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}