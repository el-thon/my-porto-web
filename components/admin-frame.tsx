import type { ReactNode } from 'react';
import { logoutAdmin } from '@/app/admin/actions';

export function AdminFrame({ children }: { children: ReactNode }) {
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a className="brand" href="/admin">Admin</a>
        <nav aria-label="Admin navigation">
          <a href="/admin">Dashboard</a>
          <a href="/admin/projects">Projects</a>
          <a href="/admin/posts">Posts</a>
          <a href="/admin/messages">Messages</a>
          <a href="/">View Site</a>
        </nav>
        <form action={logoutAdmin}>
          <button className="btn" type="submit">Logout</button>
        </form>
      </aside>
      <section className="admin-main">{children}</section>
    </main>
  );
}
