import { Mail, Phone } from 'lucide-react';
import { submitContactMessage } from '@/app/contact/actions';
import { Reveal } from '@/components/reveal';
import { SiteFooter, SiteHeader } from '@/components/site-shell';

const statusMessages = {
  sent: 'Message sent. I will get back to you soon.',
  missing: 'Please fill in your name, email, and message.',
  error: 'Message could not be sent. Check your Supabase table and policies.',
  'not-configured': 'Supabase env is not configured yet. Add your URL and keys in .env.local.'
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const formStatus = status && status in statusMessages ? statusMessages[status as keyof typeof statusMessages] : null;

  return (
    <>
      <SiteHeader active="Contact" />
      <main className="contact-page">
        <section className="contact-inner">
          <Reveal>
            <h1>Get In Touch</h1>
            <p>Have a project in mind, or just want to say hi? Reach out.</p>
          </Reveal>

          <div className="contact-cards">
            <Reveal className="contact-card" delay={0.06}>
              <Mail size={24} aria-hidden="true" />
              <span>Email Me</span>
              <strong>elthonjhonkevin@gmail.com</strong>
            </Reveal>
            <Reveal className="contact-card" delay={0.12}>
              <Phone size={24} aria-hidden="true" />
              <span>WhatsApp / Call</span>
              <strong>+62 821 1308 4394</strong>
            </Reveal>
          </div>

          <Reveal as="section" delay={0.16}>
            <form className="editorial-form" action={submitContactMessage}>
              {formStatus ? <p className="form-status">{formStatus}</p> : null}
            <label>
              <span>Name</span>
              <input name="name" type="text" placeholder="Nama kamu" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" placeholder="jane@example.com" required />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" rows={5} placeholder="Tell me about your project..." required />
            </label>
            <div className="form-footer">
              <button className="btn btn-primary" type="submit">Send Message</button>
              <small>I typically respond within 24 hours.</small>
            </div>
            </form>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
