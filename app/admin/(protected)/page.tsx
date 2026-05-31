import { redirect } from 'next/navigation';
import { AdminFrame } from '@/components/admin-frame';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase';

async function getCounts() {
  if (!supabaseAdmin) return { projects: 0, posts: 0, messages: 0, configured: false };

  const [projects, posts, messages] = await Promise.all([
    supabaseAdmin.from('projects').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('posts').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('contact_messages').select('id', { count: 'exact', head: true })
  ]);

  return {
    projects: projects.count ?? 0,
    posts: posts.count ?? 0,
    messages: messages.count ?? 0,
    configured: true
  };
}

export default async function AdminDashboardPage() {
  if (!(await isAdminAuthenticated())) redirect('/admin/login' as never);

  const counts = await getCounts();

  return (
    <AdminFrame>
      <div className="admin-heading">
        <p className="overline">Overview</p>
        <h1>Dashboard</h1>
        {!counts.configured ? <p>Supabase admin belum aktif. Isi `SUPABASE_SECRET_KEY` atau `SUPABASE_SERVICE_ROLE_KEY` di `.env.local`.</p> : null}
      </div>
      <div className="admin-stats">
        <a href="/admin/projects"><strong>{counts.projects}</strong><span>Projects</span></a>
        <a href="/admin/posts"><strong>{counts.posts}</strong><span>Posts</span></a>
        <a href="/admin/messages"><strong>{counts.messages}</strong><span>Messages</span></a>
      </div>
    </AdminFrame>
  );
}
