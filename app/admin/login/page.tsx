import { redirect } from 'next/navigation';
import { loginAdmin } from '@/app/admin/actions';
import { isAdminAuthenticated, isAdminPasswordConfigured } from '@/lib/admin-auth';

const statusMessages = {
  invalid: 'Password salah.',
  missing: 'Set ADMIN_PASSWORD di .env.local dulu.'
};

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  if (await isAdminAuthenticated()) redirect('/admin' as never);

  const { status } = await searchParams;
  const message = status && status in statusMessages ? statusMessages[status as keyof typeof statusMessages] : null;
  const isConfigured = isAdminPasswordConfigured();

  return (
    <main className="admin-login">
      <form className="admin-login-card" action={loginAdmin}>
        <p className="overline">Admin Panel</p>
        <h1>Login</h1>
        <p>Masuk untuk mengelola projects, posts, dan pesan contact.</p>
        {message ? <p className="form-status">{message}</p> : null}
        {!isConfigured ? <p className="form-status">{statusMessages.missing}</p> : null}
        <label>
          <span>Password</span>
          <input name="password" type="password" placeholder="ADMIN_PASSWORD" required />
        </label>
        <button className="btn btn-primary" type="submit">Masuk</button>
        <small>Default lokal: admin. Untuk production wajib set ADMIN_PASSWORD.</small>
      </form>
    </main>
  );
}
