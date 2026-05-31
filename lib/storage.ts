import 'server-only';

import { randomUUID } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';

const BUCKET_NAME = process.env.SUPABASE_STORAGE_BUCKET ?? 'portfolio-media';

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'image';
}

function getExtension(file: File) {
  const fromName = file.name.split('.').pop();
  if (fromName && fromName.length <= 5) return fromName.toLowerCase();

  return file.type.split('/').pop() ?? 'jpg';
}

export async function uploadImages(files: File[], folder: 'projects' | 'posts', slug: string) {
  if (!supabaseAdmin || !files.length) return [];

  const uploadedUrls: string[] = [];

  for (const file of files) {
    if (!file.size) continue;
    if (!file.type.startsWith('image/')) {
      throw new Error('Only image uploads are allowed.');
    }

    const filename = `${randomUUID()}-${slugify(file.name.replace(/\.[^/.]+$/, ''))}.${getExtension(file)}`;
    const path = `${folder}/${slugify(slug)}/images/${filename}`;

    const { error } = await supabaseAdmin.storage.from(BUCKET_NAME).upload(path, file, {
      cacheControl: '31536000',
      contentType: file.type,
      upsert: false
    });

    if (error) throw error;

    const { data } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(path);
    uploadedUrls.push(data.publicUrl);
  }

  return uploadedUrls;
}
