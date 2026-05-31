import Link from 'next/link';

export default function ContactPage() {
  return (
    <>
      <header className="site-header"><Link href="/" className="brand">Studio Journal</Link><nav className="site-nav"><Link href="/">Work</Link><Link href="/blog">Blog</Link><Link href="/contact">Contact</Link></nav><span>☾</span></header>
      <main className="section container contact">
        <section>
          <h1 className="section-title">Engage.</h1>
          <p className="section-copy">We are currently accepting specialized inquiries for architectural technology and editorial development. Send your brief to start a technical dialogue.</p>
          <div className="contact-cards">
            <div className="card card-body"><span className="eyebrow">Direct Correspondence</span><h3>hello@example.com</h3></div>
            <div className="card card-body"><span className="eyebrow">Operating Base</span><h3>Bandar Lampung / Digital First</h3></div>
          </div>
        </section>
        <form className="card contact-form">
          <label>Name<input type="text" placeholder="Given Name" /></label>
          <label>Email Address<input type="email" placeholder="address@example.com" /></label>
          <label>Project Brief<textarea rows={7} placeholder="Detail your project requirements..." /></label>
          <button className="btn btn-primary" type="button">Submit Inquiry</button>
        </form>
      </main>
    </>
  );
}
