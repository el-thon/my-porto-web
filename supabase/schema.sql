create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  image_url text,
  image_urls text[] not null default '{}',
  external_video_urls text[] not null default '{}',
  tags text[] not null default '{}',
  tech_stack text[] not null default '{}',
  project_tools text[] not null default '{}',
  client text,
  category text,
  timeline text,
  role text,
  published_at date default current_date,
  live_url text,
  github_url text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null default 'Notes',
  published_at date default current_date,
  title text not null,
  excerpt text not null,
  read_time text,
  image_url text,
  image_urls text[] not null default '{}',
  external_video_urls text[] not null default '{}',
  author_name text default 'Elthon Jhon Kevin',
  author_initials text default 'EJK',
  content text[] not null default '{}',
  tags text[] not null default '{}',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.projects
  add column if not exists image_urls text[] not null default '{}';

alter table public.projects
  add column if not exists external_video_urls text[] not null default '{}';

alter table public.projects
  add column if not exists tech_stack text[] not null default '{}';

alter table public.projects
  add column if not exists project_tools text[] not null default '{}';

alter table public.projects
  drop column if exists video_urls;

alter table public.posts
  add column if not exists image_urls text[] not null default '{}';

alter table public.posts
  add column if not exists external_video_urls text[] not null default '{}';

alter table public.posts
  drop column if exists video_urls;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-media',
  'portfolio-media',
  true,
  52428800,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

alter table public.projects enable row level security;
alter table public.posts enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "Published projects are readable" on public.projects;
create policy "Published projects are readable"
  on public.projects
  for select
  using (is_published = true);

drop policy if exists "Published posts are readable" on public.posts;
create policy "Published posts are readable"
  on public.posts
  for select
  using (is_published = true);

drop policy if exists "Anyone can submit contact messages" on public.contact_messages;
create policy "Anyone can submit contact messages"
  on public.contact_messages
  for insert
  with check (true);

delete from public.projects
where slug in ('editorial-cms', 'financial-dashboard', 'ecommerce-platform');

delete from public.posts
where slug in ('monolithic-fallacy', 'editorial-experience', 'state-management-2024', 'css-grid-architectures');

insert into public.projects (slug, title, excerpt, image_url, image_urls, external_video_urls, tags, tech_stack, project_tools, client, category, timeline, role, published_at, sort_order)
values
  ('my-porto-web', 'My Porto Web', 'Personal portfolio website for Elthon Jhon Kevin, built with Next.js and Supabase integration.', '/images/profile-photo.png', array['/images/profile-photo.png'], array['https://drive.google.com/embeddedfolderview?id=1N6TwXtRv86XQm-tZGzNV96HQcQz_8xsp#grid'], array['portfolio', 'full-stack'], array['Next.js', 'Supabase', 'TypeScript'], array['Git', 'Docker', 'Figma'], 'Personal', 'Portfolio Website', 'Ongoing', 'Full-stack Developer', current_date, 1)
on conflict (slug) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  image_url = excluded.image_url,
  image_urls = excluded.image_urls,
  external_video_urls = excluded.external_video_urls,
  tags = excluded.tags,
  tech_stack = excluded.tech_stack,
  project_tools = excluded.project_tools,
  client = excluded.client,
  category = excluded.category,
  timeline = excluded.timeline,
  role = excluded.role,
  published_at = excluded.published_at,
  sort_order = excluded.sort_order;

insert into public.posts (slug, category, published_at, title, excerpt, read_time, image_url, image_urls, external_video_urls, author_name, author_initials, content, tags)
values
  ('about-elthon-jhon-kevin', 'Notes', current_date, 'About Elthon Jhon Kevin', 'A short introduction to Elthon Jhon Kevin, Informatics Engineering student at Universitas Lampung.', '3 min read', '/images/profile-photo.png', array['/images/profile-photo.png'], '{}', 'Elthon Jhon Kevin', 'EJK', array['Saya Elthon Jhon Kevin, mahasiswa Teknik Informatika Universitas Lampung.', 'Portfolio ini dibuat untuk menampilkan project, catatan, dan pengalaman saya dalam pengembangan web.'], array['portfolio', 'informatika', 'unila'])
on conflict (slug) do update set
  category = excluded.category,
  published_at = excluded.published_at,
  title = excluded.title,
  excerpt = excluded.excerpt,
  read_time = excluded.read_time,
  image_url = excluded.image_url,
  image_urls = excluded.image_urls,
  external_video_urls = excluded.external_video_urls,
  author_name = excluded.author_name,
  author_initials = excluded.author_initials,
  content = excluded.content,
  tags = excluded.tags;
