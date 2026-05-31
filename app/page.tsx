import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Box, Braces, Code2, Database, GitBranch, Layers3, PenTool, Server, SquareTerminal } from 'lucide-react';
import { tools } from '@/components/data';
import { Reveal } from '@/components/reveal';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { getProjects } from '@/lib/content';

const icons = [Code2, Braces, SquareTerminal, Layers3, Database, Server, Box, GitBranch, PenTool];

export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <SiteHeader active="Work" />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <Reveal>
              <p className="overline">Full-stack Developer</p>
              <h1>Hi, I&apos;m Elthon Jhon Kevin</h1>
              <p className="hero-lede">Informatics Engineering Student at Lampung University that Build Modern Web Dev Experience.</p>
              <div className="action-row">
                <a className="btn btn-primary" href="#projects">See My Work</a>
                <Link className="btn" href="/contact">Contact Me</Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="hero-photo-frame" delay={0.12}>
            <Image
              src="/images/profile-photo.png"
              alt="Portrait of Elthon Jhon Kevin"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 500px"
            />
          </Reveal>
        </section>

        <section className="section container" id="projects">
          <Reveal className="section-intro">
            <h2>Projects</h2>
            <p>A selection of my recent work as an Informatics Engineering student, from web applications to backend-integrated systems.</p>
          </Reveal>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <Reveal as="article" className="project-card" delay={index * 0.08} key={project.slug}>
                <Link href={`/projects/${project.slug}`}>
                  <div className="project-media">
                    <Image src={project.image} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" />
                  </div>
                  <div className="project-body">
                    <h3>{project.title}</h3>
                    <p>{project.excerpt}</p>
                    <div className="card-foot">
                      <div className="pills">
                        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                      <ArrowRight aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          {!projects.length ? (
            <Reveal className="empty-state">
              <p>Project belum tersedia. Tambahkan project dari admin panel.</p>
            </Reveal>
          ) : null}
          <Reveal className="center-action">
            <a className="btn" href="#projects">View All Projects</a>
          </Reveal>
        </section>

        <section className="marquee-section" id="philosophy">
          <Reveal>
            <p className="overline centered">Tools &amp; Technologies</p>
          </Reveal>
          <div className="marquee" aria-label="Tools and technologies">
            <div className="marquee-track">
              {[...tools, ...tools].map((tool, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <span key={`${tool}-${index}`}>
                    <Icon size={22} aria-hidden="true" />
                    {tool}
                  </span>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
