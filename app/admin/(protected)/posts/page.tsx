import { redirect } from 'next/navigation';
import { createPost, updatePost } from '@/app/admin/actions';
import { AdminFrame } from '@/components/admin-frame';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase';

async function getPosts() {
  if (!supabaseAdmin) return [];

  const { data } = await supabaseAdmin
    .from('posts')
    .select('slug,title,category,excerpt,read_time,image_urls,content,tags,published_at,is_published,created_at')
    .order('created_at', { ascending: false });

  return data ?? [];
}

export default async function AdminPostsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  if (!(await isAdminAuthenticated())) redirect('/admin/login' as never);

  const posts = await getPosts();
  const { status } = await searchParams;

  return (
    <AdminFrame>
      <div className="admin-heading">
        <p className="overline">Content</p>
        <h1>Posts</h1>
        {status ? <p className="form-status">Status: {status}</p> : null}
      </div>
      <div className="admin-grid">
        <section className="admin-panel">
          <h2>Tambah Post</h2>
          <form className="admin-form" action={createPost}>
            <input name="slug" placeholder="slug-post" required />
            <input name="title" placeholder="Title" required />
            <input name="category" placeholder="Category" defaultValue="Notes" required />
            <textarea name="excerpt" placeholder="Excerpt" rows={3} required />
            <input name="read_time" placeholder="5 min read" />
            <label className="file-field">
              <span>Upload images</span>
              <input name="images" type="file" accept="image/*" multiple />
            </label>
            <input name="tags" placeholder="nextjs, webdev" />
            <textarea name="content" placeholder="Paragraf konten. Pisahkan paragraf dengan baris kosong." rows={8} />
            <button className="btn btn-primary" type="submit">Create</button>
          </form>
        </section>
        <section className="admin-panel">
          <h2>Data Post</h2>
          <div className="admin-list">
            {posts.map((post) => (
              <article key={post.slug}>
                <strong>{post.title}</strong>
                <span>{post.category} · {post.published_at ?? 'No date'}</span>
                <small>{post.is_published ? 'Published' : 'Draft'}</small>
                <details className="admin-edit">
                  <summary>Edit</summary>
                  <form className="admin-form" action={updatePost}>
                    <input name="original_slug" type="hidden" value={post.slug} />
                    <input name="slug" defaultValue={post.slug} required />
                    <input name="title" defaultValue={post.title} required />
                    <input name="category" defaultValue={post.category} required />
                    <textarea name="excerpt" defaultValue={post.excerpt} rows={3} required />
                    <input name="read_time" defaultValue={post.read_time ?? ''} />
                    <label className="file-field">
                      <span>Image URLs</span>
                      <textarea name="image_urls" defaultValue={(post.image_urls ?? []).join('\n')} rows={4} />
                    </label>
                    <label className="file-field">
                      <span>Add images</span>
                      <input name="images" type="file" accept="image/*" multiple />
                    </label>
                    <input name="tags" defaultValue={(post.tags ?? []).join(', ')} />
                    <textarea name="content" defaultValue={(post.content ?? []).join('\n\n')} rows={8} />
                    <label className="checkbox-field">
                      <input name="is_published" type="checkbox" defaultChecked={post.is_published} />
                      Published
                    </label>
                    <button className="btn btn-primary" type="submit">Update</button>
                  </form>
                </details>
              </article>
            ))}
            {!posts.length ? <p>Belum ada data atau Supabase belum dikonfigurasi.</p> : null}
          </div>
        </section>
      </div>
    </AdminFrame>
  );
}
