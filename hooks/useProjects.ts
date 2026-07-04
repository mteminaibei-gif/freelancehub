import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Project } from '@/lib/types';

export function useProjects(clientId?: string) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [clientId]);

  async function fetchProjects() {
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (clientId) {
        query = query.eq('client_id', clientId);
      }

      const { data, error } = await query;
      if (error) throw error;
      setProjects((data || []) as Project[]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
    } finally {
      setLoading(false);
    }
  }

  async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()
        .single();

      if (error) throw error;
      setProjects([data, ...projects]);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  }

  return { projects, loading, error, refetch: fetchProjects, createProject };
}
