import Link from 'next/link';

export default function BlogDetailPage() {
  return (
    <>
      <header className="site-header"><Link href="/" className="brand">Studio Journal</Link><nav className="site-nav"><Link href="/">Work</Link><Link href="/blog">Blog</Link><Link href="/contact">Contact</Link></nav><span>☾</span></header>
      <main className="section article-shell">
        <article className="container narrow">
          <nav className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/blog">Blog</Link></nav>
          <span className="eyebrow">Architecture</span>
          <h1 className="section-title">The Monolithic Fallacy: Designing for Eventual Consistency</h1>
          <p className="section-copy">The pursuit of the perfect architectural pattern often leads teams toward over-engineering. This essay explores monolithic simplicity and the complexity of distributed systems.</p>
          <div className="project-hero-art">Server Infrastructure / System Boundaries</div>
          <div className="rich-text">
            <p>The initial codebase is often a monolith, a single cohesive unit of logic that is easy to reason about, deploy, and debug. As an organization scales, friction increases and the call for microservices becomes louder.</p>
            <h2>Premature Optimization</h2>
            <p>The shift to distributed architecture introduces new complexity: network latency, distributed transactions, and operational overhead across multiple deployments.</p>
            <p>When transactions span boundaries, eventual consistency becomes the governing law. Teams must plan for compensating actions, recovery queues, and observability.</p>
            <blockquote>Begin with a well-modularized monolith. Enforce boundaries inside the codebase before enforcing them across network partitions.</blockquote>
          </div>
        </article>
      </main>
    </>
  );
}
