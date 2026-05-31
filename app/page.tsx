import Link from 'next/link';

const projects = [
  {
    slug: 'neural-sync',
    title: 'Neural Sync',
    description: 'Distributed state management system for real-time collaborative environments using conflict-free data patterns.',
    stack: ['Next.js', 'CRDT', 'Realtime']
  },
  {
    slug: 'void-architecture',
    title: 'Void Architecture',
    description: 'Headless CMS architecture paired with aggressive edge caching for editorial publishing workflows.',
    stack: ['Supabase', 'Edge', 'CMS']
  },
  {
    slug: 'monolith-refactor',
    title: 'Monolith Refactor',
    description: 'Incremental migration from a legacy monolith toward a modular service-oriented architecture.',
    stack: ['Node.js', 'Postgres', 'API']
  }
];

const posts = [
  'The Monolithic Fallacy: Designing for Eventual Consistency',
  'Redesigning the Editorial Experience',
  'Mastering CSS Grid Architectures'
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <Link href="/" className="brand">Studio Journal</Link>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#philosophy">Philosophy</a>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <span aria-hidden="true">☾</span>
      </header>

      <main>
        <section className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content container">
            <span className="eyebrow">Global Perspective</span>
            <h1>Mapping the Digital Frontier</h1>
            <p>We engineer sophisticated digital experiences with uncompromising technical rigor, operating between editorial design and robust system architecture.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#work">Explore Work</a>
              <a className="btn" href="#philosophy">Our Methods</a>
            </div>
          </div>
        </section>

        <section className="section container" id="work">
          <div className="section-head">
            <div>
              <h2 className="section-title">Selected Works</h2>
              <p className="section-copy">A selection of recent work focusing on editorial systems, architectural software, and high-performance web applications.</p>
            </div>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <Link className="project-card card" href={`/projects/${project.slug}`} key={project.slug}>
                <div className="project-art" aria-hidden="true">0{index + 1}</div>
                <div className="card-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="pills">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section" id="philosophy">
          <div className="container section-head">
            <div>
              <h2 className="section-title">Tools With Intent</h2>
              <p className="section-copy">Every tool is selected for maintainability, performance, and the ability to support long-term product iteration. Supabase is prepared for dynamic data integration later.</p>
            </div>
          </div>
          <div className="marquee" aria-label="Tech stack">
            <div className="marquee-track">
              {['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Edge Functions', 'Node.js', 'CSS', 'Next.js', 'React', 'TypeScript', 'Supabase'].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
            </div>
          </div>
        </section>

        <section className="section container">
          <div className="section-head">
            <h2 className="section-title">Selected Writings</h2>
            <Link className="btn" href="/blog">Open Blog</Link>
          </div>
          <div className="writing-grid">
            {posts.map((post, index) => (
              <Link className="card card-body" href={index === 0 ? '/blog/monolithic-fallacy' : '/blog'} key={post}>
                <span className="eyebrow">Architecture</span>
                <h3>{post}</h3>
                <p>Notes on system design, product engineering, and frontend craft.</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span className="brand">Studio Journal</span>
        <small>© 2026 Studio Journal. All rights reserved.</small>
        <nav className="footer-links" aria-label="Social links"><a href="#">LinkedIn</a><a href="#">GitHub</a><a href="#">Email</a></nav>
      </footer>
    </>
  );
}
