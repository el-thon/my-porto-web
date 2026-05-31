'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { clearAdminSession, setAdminSession, verifyAdminPassword } from '@/lib/admin-auth';
import { getVideoEmbedUrl } from '@/lib/video-embed';
import { supabaseAdmin } from '@/lib/supabase';
import { uploadImages } from '@/lib/storage';

function getLines(value: FormDataEntryValue | null) {
  return String(value ?? '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function getTags(value: FormDataEntryValue | null) {
  return String(value ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function formatTimeline(formData: FormData) {
  const start = String(formData.get('timeline_start') ?? '').trim();
  const end = String(formData.get('timeline_end') ?? '').trim();

  if (!start && !end) return null;
  if (start && !end) return `${start} - Present`;
  if (!start && end) return end;

  return `${start} - ${end}`;
}

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get('password') ?? '');
  const isValid = await verifyAdminPassword(password);

  if (!isValid) {
    redirect('/admin/login?status=invalid' as never);
  }

  await setAdminSession();
  redirect('/admin' as never);
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect('/admin/login' as never);
}

export async function createProject(formData: FormData) {
  if (!supabaseAdmin) redirect('/admin/projects?status=not-configured' as never);

  const tags = getTags(formData.get('tags'));
  const slug = String(formData.get('slug') ?? '').trim();
  let uploadedImages: string[];
  try {
    uploadedImages = await uploadImages(formData.getAll('images').filter((file): file is File => file instanceof File), 'projects', slug);
  } catch {
    redirect('/admin/projects?status=storage-error' as never);
  }
  const manualImageUrl = String(formData.get('image_url') ?? '').trim();
  const externalVideoUrls = getLines(formData.get('external_video_urls')).map(getVideoEmbedUrl);

  const { error } = await supabaseAdmin.from('projects').insert({
    slug,
    title: String(formData.get('title') ?? '').trim(),
    excerpt: String(formData.get('excerpt') ?? '').trim(),
    image_url: manualImageUrl || uploadedImages[0] || null,
    image_urls: uploadedImages,
    external_video_urls: externalVideoUrls,
    tags,
    client: String(formData.get('client') ?? '').trim() || null,
    category: String(formData.get('category') ?? '').trim() || null,
    timeline: formatTimeline(formData),
    role: String(formData.get('role') ?? '').trim() || null,
    live_url: String(formData.get('live_url') ?? '').trim() || null,
    github_url: String(formData.get('github_url') ?? '').trim() || null
  });

  if (error) redirect('/admin/projects?status=error' as never);

  revalidatePath('/');
  revalidatePath('/admin/projects');
  redirect('/admin/projects?status=created' as never);
}

export async function createPost(formData: FormData) {
  if (!supabaseAdmin) redirect('/admin/posts?status=not-configured' as never);

  const tags = getTags(formData.get('tags'));
  const content = String(formData.get('content') ?? '')
    .split('\n\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const slug = String(formData.get('slug') ?? '').trim();
  let uploadedImages: string[];
  try {
    uploadedImages = await uploadImages(formData.getAll('images').filter((file): file is File => file instanceof File), 'posts', slug);
  } catch {
    redirect('/admin/posts?status=storage-error' as never);
  }
  const manualImageUrl = String(formData.get('image_url') ?? '').trim();
  const externalVideoUrls = getLines(formData.get('external_video_urls')).map(getVideoEmbedUrl);

  const { error } = await supabaseAdmin.from('posts').insert({
    slug,
    category: String(formData.get('category') ?? 'Notes').trim(),
    title: String(formData.get('title') ?? '').trim(),
    excerpt: String(formData.get('excerpt') ?? '').trim(),
    read_time: String(formData.get('read_time') ?? '').trim() || null,
    image_url: manualImageUrl || uploadedImages[0] || null,
    image_urls: uploadedImages,
    external_video_urls: externalVideoUrls,
    content,
    tags
  });

  if (error) redirect('/admin/posts?status=error' as never);

  revalidatePath('/blog');
  revalidatePath('/admin/posts');
  redirect('/admin/posts?status=created' as never);
}

export async function updateProject(formData: FormData) {
  if (!supabaseAdmin) redirect('/admin/projects?status=not-configured' as never);

  const originalSlug = String(formData.get('original_slug') ?? '').trim();
  const slug = String(formData.get('slug') ?? '').trim();
  const existingImages = getLines(formData.get('image_urls'));
  let uploadedImages: string[];

  try {
    uploadedImages = await uploadImages(formData.getAll('images').filter((file): file is File => file instanceof File), 'projects', slug);
  } catch {
    redirect('/admin/projects?status=storage-error' as never);
  }

  const imageUrls = [...existingImages, ...uploadedImages];
  const externalVideoUrls = getLines(formData.get('external_video_urls')).map(getVideoEmbedUrl);

  const { error } = await supabaseAdmin
    .from('projects')
    .update({
      slug,
      title: String(formData.get('title') ?? '').trim(),
      excerpt: String(formData.get('excerpt') ?? '').trim(),
      image_url: imageUrls[0] ?? null,
      image_urls: imageUrls,
      external_video_urls: externalVideoUrls,
      tags: getTags(formData.get('tags')),
      client: String(formData.get('client') ?? '').trim() || null,
      category: String(formData.get('category') ?? '').trim() || null,
      timeline: formatTimeline(formData),
      role: String(formData.get('role') ?? '').trim() || null,
      live_url: String(formData.get('live_url') ?? '').trim() || null,
      github_url: String(formData.get('github_url') ?? '').trim() || null,
      is_published: formData.has('is_published')
    })
    .eq('slug', originalSlug);

  if (error) redirect('/admin/projects?status=update-error' as never);

  revalidatePath('/');
  revalidatePath('/admin/projects');
  revalidatePath(`/projects/${originalSlug}`);
  revalidatePath(`/projects/${slug}`);
  redirect('/admin/projects?status=updated' as never);
}

export async function updatePost(formData: FormData) {
  if (!supabaseAdmin) redirect('/admin/posts?status=not-configured' as never);

  const originalSlug = String(formData.get('original_slug') ?? '').trim();
  const slug = String(formData.get('slug') ?? '').trim();
  const existingImages = getLines(formData.get('image_urls'));
  let uploadedImages: string[];

  try {
    uploadedImages = await uploadImages(formData.getAll('images').filter((file): file is File => file instanceof File), 'posts', slug);
  } catch {
    redirect('/admin/posts?status=storage-error' as never);
  }

  const imageUrls = [...existingImages, ...uploadedImages];
  const externalVideoUrls = getLines(formData.get('external_video_urls')).map(getVideoEmbedUrl);
  const content = String(formData.get('content') ?? '')
    .split('\n\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const { error } = await supabaseAdmin
    .from('posts')
    .update({
      slug,
      category: String(formData.get('category') ?? 'Notes').trim(),
      title: String(formData.get('title') ?? '').trim(),
      excerpt: String(formData.get('excerpt') ?? '').trim(),
      read_time: String(formData.get('read_time') ?? '').trim() || null,
      image_url: imageUrls[0] ?? null,
      image_urls: imageUrls,
      external_video_urls: externalVideoUrls,
      content,
      tags: getTags(formData.get('tags')),
      is_published: formData.has('is_published')
    })
    .eq('slug', originalSlug);

  if (error) redirect('/admin/posts?status=update-error' as never);

  revalidatePath('/blog');
  revalidatePath('/admin/posts');
  revalidatePath(`/blog/${originalSlug}`);
  revalidatePath(`/blog/${slug}`);
  redirect('/admin/posts?status=updated' as never);
}
