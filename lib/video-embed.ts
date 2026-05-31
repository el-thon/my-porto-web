export function getVideoEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');

    if (host === 'drive.google.com') {
      const folderMatch = parsed.pathname.match(/\/drive\/folders\/([^/]+)/);
      if (folderMatch?.[1]) {
        return `https://drive.google.com/embeddedfolderview?id=${folderMatch[1]}#grid`;
      }

      const fileMatch = parsed.pathname.match(/\/file\/d\/([^/]+)/);
      const id = fileMatch?.[1] ?? parsed.searchParams.get('id');

      return id ? `https://drive.google.com/file/d/${id}/preview` : url;
    }

    if (host === 'youtu.be') {
      const id = parsed.pathname.replace('/', '');
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const id = parsed.searchParams.get('v');
      if (id) return `https://www.youtube.com/embed/${id}`;
      if (parsed.pathname.startsWith('/embed/')) return url;
      if (parsed.pathname.startsWith('/shorts/')) {
        return `https://www.youtube.com/embed/${parsed.pathname.split('/')[2]}`;
      }
    }

    return url;
  } catch {
    return url;
  }
}
