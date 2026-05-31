'use server';

import { redirect } from 'next/navigation';
import { supabaseAdmin, supabase } from '@/lib/supabase';

export async function submitContactMessage(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !email || !message) {
    redirect('/contact?status=missing');
  }

  const client = supabaseAdmin ?? supabase;

  if (!client) {
    redirect('/contact?status=not-configured');
  }

  const { error } = await client.from('contact_messages').insert({
    name,
    email,
    message
  });

  if (error) {
    redirect('/contact?status=error');
  }

  redirect('/contact?status=sent');
}
