import type { NextConfig } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

function getSupabaseHostname() {
  if (!supabaseUrl) return undefined;

  try {
    return new URL(supabaseUrl).hostname;
  } catch {
    return undefined;
  }
}

const supabaseHostname = getSupabaseHostname();

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: supabaseHostname
      ? [
          {
            protocol: 'https',
            hostname: supabaseHostname,
            pathname: '/storage/v1/object/public/**'
          }
        ]
      : []
  }
};

export default nextConfig;
