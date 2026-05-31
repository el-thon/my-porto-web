import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import { getProject, getProjects } from '@/lib/content';

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = await getProject(slug);
  if (!project) notFound();

  const nextProject = projects.find((item) => item.slug !== project.slug) ?? projects[1];

  return (
    <>
      <SiteHeader active="Work" />
      <main className="project-page">
        <section className="container">
          <Reveal>
            <Link className="back-link" href="/">← Back to Projects</Link>
          </Reveal>
          <Reveal className="case-hero" delay={0.08}>
            <Image src={project.image} alt="" fill priority sizes="100vw" />
            <h1>{project.title}</h1>
          </Reveal>
          <Reveal className="case-meta" delay={0.1}>
            <div><span>Published</span><strong>{project.publishedAt ?? 'Oct 2023'}</strong></div>
            <div><span>Category</span><strong>{project.category}</strong></div>
            <div><span>Tech</span><strong>{project.tags.join(', ')}</strong></div>
          </Reveal>
        </section>

        <section className="container case-layout">
          <Reveal className="case-sidebar">
            <div><span>Client</span><strong>{project.client}</strong></div>
            <div><span>Timeline</span><strong>{project.timeline}</strong></div>
            <div><span>Role</span><strong>{project.role}</strong></div>
            {project.liveUrl ? <a className="btn" href={project.liveUrl}>View Live <ExternalLink size={14} /></a> : null}
            {project.githubUrl ? <a className="btn" href={project.githubUrl}>GitHub</a> : null}
          </Reveal>
          <Reveal as="article" className="case-copy" delay={0.08}>
            <h2>Overview</h2>
            <p>{project.excerpt}</p>
            <h3>Technical Scope</h3>
            <p>This project is managed from the Supabase-backed admin panel and displayed dynamically on the portfolio site.</p>
            {project.imageUrls?.length ? (
              <div className="media-gallery">
                {project.imageUrls.map((imageUrl) => (
                  <div className="gallery-image" key={imageUrl}>
                    <Image src={imageUrl} alt="" fill sizes="(max-width: 900px) 100vw, 360px" />
                  </div>
                ))}
              </div>
            ) : null}
            {project.externalVideoUrls?.length ? (
              <div className="media-gallery">
                {project.externalVideoUrls.map((videoUrl) => (
                  <iframe
                    className="gallery-embed"
                    key={videoUrl}
                    src={videoUrl}
                    title={`${project.title} video`}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ))}
              </div>
            ) : null}
          </Reveal>
        </section>

        {nextProject ? <section className="container next-project">
          <Reveal>
            <p className="overline">Next Project</p>
            <Link href={`/projects/${nextProject.slug}`} className="next-card">
              <div>
                <h2>{nextProject.title}</h2>
                <p>{nextProject.excerpt}</p>
              </div>
              <div className="next-media">
                <Image src={nextProject.image} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
            </Link>
          </Reveal>
        </section> : null}
      </main>
      <SiteFooter />
    </>
  );
}
