import Link from 'next/link';
import { Code2, Mail, MessageCircle, UserRound } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { href: '/', label: 'Work' },
  { href: '/tech-stack', label: 'Tech Stack' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' }
] as const;

export function SiteHeader({ active = 'Work' }: { active?: string }) {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Portofolio Website home">Portofolio Website</Link>
      <nav className="site-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link className={active === item.label ? 'is-active' : ''} href={item.href} key={item.label}>
            {item.label}
          </Link>
        ))}
      </nav>
      <ThemeToggle />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link href="/" className="brand">Portofolio Website</Link>
      <nav className="footer-links" aria-label="Social links">
        <a href="https://github.com/el-thon" target="_blank" rel="noreferrer">
          <Code2 size={16} aria-hidden="true" />
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/elthon-jhon-kevin-227bb2293" target="_blank" rel="noreferrer">
          <UserRound size={16} aria-hidden="true" />
          LinkedIn
        </a>
        <a href="https://www.threads.com/@elthon_jobseeker" target="_blank" rel="noreferrer">
          <MessageCircle size={16} aria-hidden="true" />
          Threads
        </a>
        <a href="mailto:elthonjhonkevin@gmai.com">
          <Mail size={16} aria-hidden="true" />
          Email
        </a>
      </nav>
      <small>© 2026 ELTHON JHON KEVIN — ALL RIGHTS RESERVED</small>
    </footer>
  );
}
