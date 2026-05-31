import { redirect } from 'next/navigation';
import { AdminFrame } from '@/components/admin-frame';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase';

async function getMessages() {
  if (!supabaseAdmin) return [];

  const { data } = await supabaseAdmin
    .from('contact_messages')
    .select('id,name,email,message,created_at')
    .order('created_at', { ascending: false })
    .limit(50);

  return data ?? [];
}

export default async function AdminMessagesPage() {
  if (!(await isAdminAuthenticated())) redirect('/admin/login' as never);

  const messages = await getMessages();

  return (
    <AdminFrame>
      <div className="admin-heading">
        <p className="overline">Inbox</p>
        <h1>Messages</h1>
      </div>
      <section className="admin-panel">
        <div className="admin-list">
          {messages.map((message) => (
            <article key={message.id}>
              <strong>{message.name}</strong>
              <span>{message.email} · {new Date(message.created_at).toLocaleString('id-ID')}</span>
              <p>{message.message}</p>
            </article>
          ))}
          {!messages.length ? <p>Belum ada pesan atau Supabase belum dikonfigurasi.</p> : null}
        </div>
      </section>
    </AdminFrame>
  );
}
