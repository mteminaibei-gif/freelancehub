'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { useProjects } from '@/hooks/useProjects';
import { Project } from '@/lib/types';

export default function NewProjectPage() {
  return (
    <ProtectedRoute>
      <NewProject />
    </ProtectedRoute>
  );
}

function NewProject() {
  const { user } = useAuth();
  const { createProject } = useProjects();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'web-development',
    budget_min: '',
    budget_max: '',
    deadline: '',
    required_skills: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required');
      setLoading(false);
      return;
    }

    if (!user) {
      setError('You must be logged in to create a project');
      setLoading(false);
      return;
    }

    const projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'> = {
      client_id: user.id,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      budget_min: formData.budget_min ? parseInt(formData.budget_min) : undefined,
      budget_max: formData.budget_max ? parseInt(formData.budget_max) : undefined,
      deadline: formData.deadline || undefined,
      required_skills: formData.required_skills
        ? formData.required_skills.split(',').map((s) => s.trim())
        : undefined,
      status: 'open',
    };

    const { data, error: projectError } = await createProject(projectData);

    if (projectError) {
      setError(projectError instanceof Error ? projectError.message : 'Failed to create project');
      setLoading(false);
      return;
    }

    if (data) {
      router.push('/dashboard');
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Post a New Project</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="bg-white rounded-3xl p-8 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Project Title</label>
                <input
                  type="text"
                  placeholder="e.g., Build a React Dashboard"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  placeholder="Describe your project in detail..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-600 transition"
                  >
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="graphic-design">Graphic Design</option>
                    <option value="writing">Writing</option>
                    <option value="marketing">Marketing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-600 transition"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Budget Min ($)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.budget_min}
                    onChange={(e) => setFormData({ ...formData, budget_min: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Budget Max ($)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.budget_max}
                    onChange={(e) => setFormData({ ...formData, budget_max: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Required Skills (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g., React, Node.js, MongoDB"
                  value={formData.required_skills}
                  onChange={(e) => setFormData({ ...formData, required_skills: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-2xl font-semibold transition"
                >
                  {loading ? 'Publishing...' : 'Publish Project'}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-2xl font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
