'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Code2, Mail, MessageCircle, UserRound } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { href: '/', label: 'Work' },
  { href: '/#tech-stack', label: 'Tech Stack' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' }
] as const;

export function SiteHeader({ active = 'Work' }: { active?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Portofolio Website home">Portofolio Website</Link>
      <button
        className="nav-menu-button"
        type="button"
        aria-label="Open navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>
      <button
        className={isOpen ? 'nav-backdrop is-open' : 'nav-backdrop'}
        type="button"
        aria-label="Close navigation"
        onClick={() => setIsOpen(false)}
      />
      <nav className={isOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
        <button className="nav-close-button" type="button" aria-label="Close navigation" onClick={() => setIsOpen(false)}>Close</button>
        <span className="drawer-brand">Portofolio Website</span>
        {navItems.map((item) => (
          <Link className={active === item.label ? 'is-active' : ''} href={item.href} key={item.label} onClick={() => setIsOpen(false)}>
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
