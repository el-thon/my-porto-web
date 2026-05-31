import Link from 'next/link';

const project = {
  title: 'Quantum Architecture Redesign',
  client: 'Apex Financial Systems',
  role: 'Lead Systems Architect',
  timeline: 'Q3 2023 - Q1 2024',
  stack: ['Rust', 'Next.js', 'Postgres', 'Edge'],
  summary: 'A high-performance architecture redesign for transaction-heavy platforms that need reliable state transitions under extreme load.'
};

export default function ProjectDetailPage() {
  return (
    <>
      <header className="site-header"><Link href="/" className="brand">Studio Journal</Link><nav className="site-nav"><Link href="/">Work</Link><Link href="/blog">Blog</Link><Link href="/contact">Contact</Link></nav><span>☾</span></header>
      <main className="section container detail-layout">
        <article>
          <Link className="eyebrow" href="/">← Back to Works</Link>
          <h1 className="section-title">{project.title}</h1>
          <p className="section-copy">{project.summary}</p>
          <div className="project-hero-art">Architecture / Event Sourcing / Edge Delivery</div>
          <section className="rich-text">
            <h2>The Challenge</h2>
            <p>The existing architecture was buckling under exponential transaction growth. Race conditions and memory leaks required a fundamental rethink of how state was distributed across services.</p>
            <p>Our approach abandoned traditional locking mechanisms in favor of an event-sourced append-only log strategy inspired by modern distributed database paradigms.</p>
            <h2>Technical Implementation</h2>
            <pre><code>{`function applyEvent(state, event) {\n  return { ...state, ledger: [...state.ledger, event] };\n}`}</code></pre>
            <p>This functional core allowed peripheral services to scale horizontally without risking state corruption.</p>
          </section>
        </article>
        <aside className="info-card card">
          <span className="eyebrow">Client</span><strong>{project.client}</strong>
          <span className="eyebrow">Role</span><strong>{project.role}</strong>
          <span className="eyebrow">Timeline</span><strong>{project.timeline}</strong>
          <div className="pills">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
          <Link className="btn btn-primary" href="/contact">Start a Project</Link>
        </aside>
      </main>
    </>
  );
}
