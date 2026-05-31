import { type Post, type Project } from '@/components/data';
import { supabase } from '@/lib/supabase';

type ProjectRow = {
  slug: string;
  title: string;
  excerpt: string;
  image_url: string | null;
  image_urls: string[] | null;
  external_video_urls: string[] | null;
  tags: string[] | null;
  client: string | null;
  category: string | null;
  timeline: string | null;
  role: string | null;
  published_at: string | null;
  live_url: string | null;
  github_url: string | null;
};

type PostRow = {
  slug: string;
  category: string;
  published_at: string | null;
  title: string;
  excerpt: string;
  read_time: string | null;
  image_url: string | null;
  image_urls: string[] | null;
  external_video_urls: string[] | null;
  author_name: string | null;
  author_initials: string | null;
  content: string[] | null;
  tags: string[] | null;
};

function formatDate(value: string | null) {
  if (!value) return '';

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).format(new Date(value));
}

function mapProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    image: row.image_url ?? '/images/project-detail-ref.png',
    imageUrls: row.image_urls ?? [],
    externalVideoUrls: row.external_video_urls ?? [],
    tags: row.tags ?? [],
    client: row.client ?? 'Personal',
    category: row.category ?? 'Web Development',
    timeline: row.timeline ?? 'Ongoing',
    role: row.role ?? 'Developer',
    publishedAt: formatDate(row.published_at),
    liveUrl: row.live_url,
    githubUrl: row.github_url
  };
}

function mapPost(row: PostRow): Post {
  return {
    slug: row.slug,
    category: row.category,
    date: formatDate(row.published_at),
    title: row.title,
    excerpt: row.excerpt,
    readTime: row.read_time ?? '5 min read',
    image: row.image_url ?? '/images/blog-detail-ref.png',
    imageUrls: row.image_urls ?? [],
    externalVideoUrls: row.external_video_urls ?? [],
    authorName: row.author_name ?? 'Elthon Jhon Kevin',
    authorInitials: row.author_initials ?? 'EJK',
    content: row.content ?? undefined,
    tags: row.tags ?? []
  };
}

export async function getProjects(): Promise<Project[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('projects')
    .select('slug,title,excerpt,image_url,image_urls,external_video_urls,tags,client,category,timeline,role,published_at,live_url,github_url')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('published_at', { ascending: false });

  if (error || !data?.length) return [];

  return data.map(mapProject);
}

export async function getProject(slug: string): Promise<Project | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('projects')
    .select('slug,title,excerpt,image_url,image_urls,external_video_urls,tags,client,category,timeline,role,published_at,live_url,github_url')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error || !data) return null;

  return mapProject(data);
}

export async function getPosts(): Promise<Post[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('posts')
    .select('slug,category,published_at,title,excerpt,read_time,image_url,image_urls,external_video_urls,author_name,author_initials,content,tags')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error || !data?.length) return [];

  return data.map(mapPost);
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('posts')
    .select('slug,category,published_at,title,excerpt,read_time,image_url,image_urls,external_video_urls,author_name,author_initials,content,tags')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error || !data) return null;

  return mapPost(data);
}
