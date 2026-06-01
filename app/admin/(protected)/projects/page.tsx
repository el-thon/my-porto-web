import { redirect } from 'next/navigation';
import { createProject, updateProject } from '@/app/admin/actions';
import { AdminFrame } from '@/components/admin-frame';
import { MultiImageInput } from '@/components/multi-image-input';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase';

function splitTimeline(value: string | null) {
  if (!value) return { start: '', end: '' };

  const [start = '', end = ''] = value.split(' - ');
  return {
    start,
    end: end === 'Present' ? '' : end
  };
}

async function getProjects() {
  if (!supabaseAdmin) return [];

  const { data } = await supabaseAdmin
    .from('projects')
    .select('slug,title,excerpt,image_urls,tags,tech_stack,project_tools,client,category,timeline,role,live_url,github_url,is_published,created_at')
    .order('created_at', { ascending: false });

  return data ?? [];
}

export default async function AdminProjectsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  if (!(await isAdminAuthenticated())) redirect('/admin/login' as never);

  const projects = await getProjects();
  const { status } = await searchParams;

  return (
    <AdminFrame>
      <div className="admin-heading">
        <p className="overline">Content</p>
        <h1>Projects</h1>
        {status ? <p className="form-status">Status: {status}</p> : null}
      </div>
      <div className="admin-grid">
        <section className="admin-panel">
          <h2>Tambah Project</h2>
          <form className="admin-form" action={createProject}>
            <input name="slug" placeholder="slug-project" required />
            <input name="title" placeholder="Title" required />
            <textarea name="excerpt" placeholder="Excerpt" rows={3} required />
            <MultiImageInput label="Upload images" />
            <input name="tags" placeholder="Next.js, Supabase" />
            <input name="tech_stack" placeholder="Tech Stack: Next.js, Supabase, TypeScript" />
            <input name="project_tools" placeholder="Tools: Docker, Git, Figma" />
            <input name="client" placeholder="Client" />
            <input name="category" placeholder="Category" />
            <div className="date-range-field">
              <label>
                <span>Start</span>
                <input name="timeline_start" type="month" />
              </label>
              <label>
                <span>End</span>
                <input name="timeline_end" type="month" />
              </label>
            </div>
            <input name="role" placeholder="Role" />
            <input name="live_url" placeholder="Live URL" />
            <input name="github_url" placeholder="GitHub URL" />
            <button className="btn btn-primary" type="submit">Create</button>
          </form>
        </section>
        <section className="admin-panel">
          <h2>Data Project</h2>
          <div className="admin-list">
            {projects.map((project) => (
              (() => {
                const timeline = splitTimeline(project.timeline);

                return (
                  <article key={project.slug}>
                    <strong>{project.title}</strong>
                    <span>{project.category ?? 'No category'} · {(project.tags ?? []).join(', ')}</span>
                    <small>{project.is_published ? 'Published' : 'Draft'}</small>
                    <details className="admin-edit">
                      <summary>Edit</summary>
                      <form className="admin-form" action={updateProject}>
                        <input name="original_slug" type="hidden" value={project.slug} />
                        <input name="slug" defaultValue={project.slug} required />
                        <input name="title" defaultValue={project.title} required />
                        <textarea name="excerpt" defaultValue={project.excerpt} rows={3} required />
                        <label className="file-field">
                          <span>Image URLs</span>
                          <textarea name="image_urls" defaultValue={(project.image_urls ?? []).join('\n')} rows={4} />
                        </label>
                        <MultiImageInput label="Add images" />
                        <input name="tags" defaultValue={(project.tags ?? []).join(', ')} />
                        <input name="tech_stack" defaultValue={(project.tech_stack ?? []).join(', ')} />
                        <input name="project_tools" defaultValue={(project.project_tools ?? []).join(', ')} />
                        <input name="client" defaultValue={project.client ?? ''} />
                        <input name="category" defaultValue={project.category ?? ''} />
                        <div className="date-range-field">
                          <label>
                            <span>Start</span>
                            <input name="timeline_start" type="month" defaultValue={timeline.start} />
                          </label>
                          <label>
                            <span>End</span>
                            <input name="timeline_end" type="month" defaultValue={timeline.end} />
                          </label>
                        </div>
                        <input name="role" defaultValue={project.role ?? ''} />
                        <input name="live_url" defaultValue={project.live_url ?? ''} />
                        <input name="github_url" defaultValue={project.github_url ?? ''} />
                        <label className="checkbox-field">
                          <input name="is_published" type="checkbox" defaultChecked={project.is_published} />
                          Published
                        </label>
                        <button className="btn btn-primary" type="submit">Update</button>
                      </form>
                    </details>
                  </article>
                );
              })()
            ))}
            {!projects.length ? <p>Belum ada data atau Supabase belum dikonfigurasi.</p> : null}
          </div>
        </section>
      </div>
    </AdminFrame>
  );
}
