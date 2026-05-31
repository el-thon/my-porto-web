import Link from 'next/link';

const posts = [
  {
    slug: 'monolithic-fallacy',
    category: 'Architecture',
    title: 'The Monolithic Fallacy: Designing for Eventual Consistency',
    excerpt: 'A practical essay on when to keep a monolith, when to split services, and how to avoid premature distributed complexity.'
  },
  {
    slug: 'editorial-experience',
    category: 'Design Systems',
    title: 'Redesigning the Editorial Experience',
    excerpt: 'How typography, content modeling, and visual hierarchy shape tools for modern editorial teams.'
  },
  {
    slug: 'css-grid-architectures',
    category: 'Frontend',
    title: 'Mastering CSS Grid Architectures',
    excerpt: 'Using grid systems to create responsive editorial layouts that remain flexible across product pages.'
  },
  {
    slug: 'accessible-components',
    category: 'React',
    title: 'Building Accessible React Components',
    excerpt: 'Component architecture notes for resilient UI primitives with keyboard and screen reader support.'
  }
];

export default function BlogPage() {
  return (
    <>
      <header className="site-header"><Link href="/" className="brand">Studio Journal</Link><nav className="site-nav"><Link href="/">Work</Link><Link href="/blog">Blog</Link><Link href="/contact">Contact</Link></nav><span>☾</span></header>
      <main className="section container">
        <div className="section-head">
          <div>
            <h1 className="section-title">Selected Writings</h1>
            <p className="section-copy">Essays on software architecture, editorial interfaces, and design implementation.</p>
          </div>
        </div>
        <div className="writing-grid two-col">
          {posts.map((post) => (
            <Link className="card card-body article-card" href={`/blog/${post.slug}`} key={post.slug}>
              <span className="eyebrow">{post.category}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span className="read-more">Read Article →</span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
