import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Reveal } from '@/components/reveal';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { getPost, getPosts } from '@/lib/content';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const content = post.content ?? [];

  return (
    <>
      <SiteHeader active="Blog" />
      <main className="article-page">
        <article className="article-wrap">
          <Reveal>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/blog">Blog</Link>
              <span>/</span>
              <strong>{post.title}</strong>
            </nav>
            <h1>{post.title}</h1>
            <div className="author-row">
              <span className="avatar">{post.authorInitials ?? 'J'}</span>
              <div>
                <strong>{post.authorName ?? 'Elthon Jhon Kevin'}</strong>
                <small>{post.date} · {post.readTime}</small>
              </div>
            </div>
          </Reveal>

          <Reveal className="article-image" delay={0.08}>
            <Image src={post.image} alt="" fill sizes="(max-width: 900px) 100vw, 720px" />
          </Reveal>

          <Reveal className="article-body" delay={0.12}>
            {content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {post.imageUrls?.length ? (
              <div className="media-gallery">
                {post.imageUrls.map((imageUrl) => (
                  <div className="gallery-image" key={imageUrl}>
                    <Image src={imageUrl} alt="" fill sizes="(max-width: 900px) 100vw, 360px" />
                  </div>
                ))}
              </div>
            ) : null}
            {post.externalVideoUrls?.length ? (
              <div className="media-gallery">
                {post.externalVideoUrls.map((videoUrl) => (
                  <iframe
                    className="gallery-embed"
                    key={videoUrl}
                    src={videoUrl}
                    title={`${post.title} video`}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ))}
              </div>
            ) : null}
            <div className="tag-row">
              {(post.tags?.length ? post.tags : ['portfolio']).map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </Reveal>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
