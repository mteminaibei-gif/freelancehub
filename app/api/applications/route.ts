import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { project_id, freelancer_id, cover_letter, proposed_rate } = await request.json();

    if (!project_id || !freelancer_id || !cover_letter) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          project_id,
          freelancer_id,
          cover_letter,
          proposed_rate,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('project_id');
    const freelancerId = searchParams.get('freelancer_id');

    let query = supabase.from('applications').select('*');

    if (projectId) {
      query = query.eq('project_id', projectId);
    }

    if (freelancerId) {
      query = query.eq('freelancer_id', freelancerId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
