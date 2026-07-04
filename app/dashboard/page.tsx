'use client';

import { Navbar } from '@/components/Navbar';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { useProjects } from '@/hooks/useProjects';
import { ProjectCard } from '@/components/ProjectCard';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

function Dashboard() {
  const { user, profile } = useAuth();
  const { projects, loading } = useProjects(user?.id);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Welcome, {profile?.full_name}!</h1>
            <p className="text-gray-600 text-lg">Manage your work and projects</p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-3xl p-6 border border-gray-200">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Total Projects</h3>
              <p className="text-3xl font-bold">{projects.length}</p>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-gray-200">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Active Projects</h3>
              <p className="text-3xl font-bold">{projects.filter((p) => p.status === 'in_progress').length}</p>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-gray-200">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Completed</h3>
              <p className="text-3xl font-bold">{projects.filter((p) => p.status === 'completed').length}</p>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-gray-200">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Role</h3>
              <p className="text-lg font-bold capitalize">{profile?.role}</p>
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Your Projects</h2>
              {profile?.role !== 'freelancer' && (
                <Link
                  href="/projects/new"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
                >
                  <Plus className="w-5 h-5" />
                  New Project
                </Link>
              )}
            </div>

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {!loading && projects.length === 0 && (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
                <p className="text-gray-600 text-lg mb-6">No projects yet</p>
                {profile?.role !== 'freelancer' && (
                  <Link
                    href="/projects/new"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-semibold transition"
                  >
                    Create Your First Project
                  </Link>
                )}
              </div>
            )}

            {!loading && projects.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
