export interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  status: 'published' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}