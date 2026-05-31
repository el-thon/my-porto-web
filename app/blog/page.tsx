import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { getPosts } from '@/lib/content';

const filters = ['All', 'Tutorial', 'Case Study', 'Notes'];

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <SiteHeader active="Blog" />
      <main className="page-shell">
        <section className="container blog-hero">
          <Reveal>
            <h1>Blog</h1>
            <p>Thoughts, tutorials, and notes from my work.</p>
          </Reveal>
          <Reveal className="filter-row" delay={0.08}>
            {filters.map((filter) => (
              <button className={filter === 'All' ? 'filter is-selected' : 'filter'} type="button" key={filter}>
                {filter}
              </button>
            ))}
          </Reveal>
        </section>

        <section className="container blog-grid" aria-label="Blog articles">
          {posts.map((post, index) => (
            <Reveal as="article" className="post-card" delay={index * 0.07} key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <div className="post-media">
                  <Image src={post.image} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
                </div>
                <div className="post-meta">
                  <strong>{post.category}</strong>
                  <span>{post.date}</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <small>{post.readTime}</small>
              </Link>
            </Reveal>
          ))}
          {!posts.length ? (
            <Reveal className="empty-state">
              <p>Post belum tersedia. Tambahkan post dari admin panel.</p>
            </Reveal>
          ) : null}
        </section>

        <Reveal className="center-action spacious">
          <button className="btn" type="button">Load More</button>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
