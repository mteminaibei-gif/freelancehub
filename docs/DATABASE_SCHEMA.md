# FreelanceHub Database Schema

This document outlines the Supabase database schema for FreelanceHub.

## Tables

### 1. `profiles`
Stores user profile information.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  role TEXT NOT NULL CHECK (role IN ('client', 'freelancer', 'both')),
  title TEXT,
  hourly_rate INT,
  rating DECIMAL(3,2),
  reviews_count INT DEFAULT 0,
  skills TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2. `projects`
Stores project information posted by clients.

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  budget_min INT,
  budget_max INT,
  required_skills TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  deadline TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. `applications`
Stores freelancer applications to projects.

```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  cover_letter TEXT NOT NULL,
  proposed_rate INT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4. `reviews`
Stores reviews and ratings between users.

```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. `work` (Contracts)
Stores active work/contract information.

```sql
CREATE TABLE work (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  start_date TIMESTAMP NOT NULL DEFAULT NOW(),
  end_date TIMESTAMP,
  payment_amount INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Setup Instructions

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create a new project
   - Copy the project URL and anon key

2. **Run SQL Schema**
   - Go to the SQL Editor in Supabase
   - Run the SQL statements above for each table

3. **Set up Row Level Security (RLS)**
   ```sql
   -- Profiles: Users can read all profiles, only update their own
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Public read access" ON profiles
     FOR SELECT USING (true);

   CREATE POLICY "Users can update own profile" ON profiles
     FOR UPDATE USING (auth.uid() = id);

   -- Projects: Anyone can read, only creators can update/delete
   ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Public read access" ON projects
     FOR SELECT USING (true);

   CREATE POLICY "Creators can update" ON projects
     FOR UPDATE USING (auth.uid() = client_id);

   CREATE POLICY "Creators can delete" ON projects
     FOR DELETE USING (auth.uid() = client_id);

   -- Applications: Visible to project creator and applicant
   ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Users can see own applications" ON applications
     FOR SELECT USING (
       auth.uid() = freelancer_id OR
       auth.uid() = (SELECT client_id FROM projects WHERE id = project_id)
     );

   CREATE POLICY "Freelancers can create applications" ON applications
     FOR INSERT WITH CHECK (auth.uid() = freelancer_id);
   ```

4. **Update Environment Variables**
   - Add your Supabase URL to `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`
   - Add your Supabase anon key to `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`

## Key Relationships

- `profiles` ← One user can have many `projects` (as client)
- `profiles` ← One user can have many `applications` (as freelancer)
- `projects` → Client references `profiles`
- `applications` → References both `projects` and `profiles`
- `reviews` → References both `profiles` (reviewer and reviewee) and `projects`
- `work` → Links `projects`, clients, and freelancers

## API Endpoints

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/[id]` - Get project details
- `PATCH /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Applications
- `GET /api/applications` - List applications
- `POST /api/applications` - Submit application
- `POST /api/applications/[id]` - Accept/reject application

### Reviews
- `GET /api/reviews` - List reviews
- `POST /api/reviews` - Create review

### Profiles
- `GET /api/profiles` - List profiles
- `GET /api/profiles/[id]` - Get profile details
- `PATCH /api/profiles/[id]` - Update profile
