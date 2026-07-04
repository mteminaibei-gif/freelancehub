// User types
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  role: 'client' | 'freelancer' | 'both';
  created_at: string;
  updated_at: string;
}

export interface Freelancer extends Profile {
  title?: string;
  hourly_rate?: number;
  rating?: number;
  reviews_count?: number;
  skills?: string[];
}

// Project types
export interface Project {
  id: string;
  client_id: string;
  title: string;
  description: string;
  budget_min?: number;
  budget_max?: number;
  category: string;
  required_skills?: string[];
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  deadline?: string;
  created_at: string;
  updated_at: string;
}

// Application types
export interface Application {
  id: string;
  project_id: string;
  freelancer_id: string;
  cover_letter: string;
  proposed_rate?: number;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

// Review types
export interface Review {
  id: string;
  reviewer_id: string;
  reviewee_id: string;
  project_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

// Contract/Work types
export interface Work {
  id: string;
  project_id: string;
  client_id: string;
  freelancer_id: string;
  status: 'active' | 'completed' | 'cancelled';
  start_date: string;
  end_date?: string;
  payment_amount: number;
  created_at: string;
}
