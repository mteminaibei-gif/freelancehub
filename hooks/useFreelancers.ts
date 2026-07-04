import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Freelancer } from '@/lib/types';

export function useFreelancers(limit?: number) {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchFreelancers();
  }, []);

  async function fetchFreelancers() {
    try {
      let query = supabase
        .from('profiles')
        .select('*')
        .eq('role', 'freelancer')
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      setFreelancers((data || []) as Freelancer[]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch freelancers'));
    } finally {
      setLoading(false);
    }
  }

  return { freelancers, loading, error, refetch: fetchFreelancers };
}
