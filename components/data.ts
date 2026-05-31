export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageUrls?: string[];
  externalVideoUrls?: string[];
  tags: string[];
  techStack?: string[];
  projectTools?: string[];
  client: string;
  category: string;
  timeline: string;
  role: string;
  publishedAt?: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
};

export type Post = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
  imageUrls?: string[];
  externalVideoUrls?: string[];
  authorName?: string;
  authorInitials?: string;
  content?: string[];
  tags?: string[];
};

export const projects: Project[] = [];

export const posts: Post[] = [];

export const tools = [
  'JavaScript',
  'PHP',
  'C++',
  'Java',
  'Next.js',
  'React.js',
  'Blade UI',
  'Shadcn/UI',
  'Tailwind CSS',
  'Node.js',
  'Express.js',
  'Laravel',
  'MySQL',
  'PostgreSQL',
  'Docker',
  'Postman',
  'Git',
  'Figma',
  'Google Stitch',
  'Ubuntu',
  'Arch Linux',
  'Arduino IDE',
  'Microcontroller Basics',
  'Web Development',
  'IoT Prototyping',
  'System Design',
  'Supabase',
  'TypeScript'
];
