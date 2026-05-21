import { notFound } from 'next/navigation';
import { engelabProjects } from '../../../../lib/data/engelab-projects';
import ProjectLibraryDetailClient from './ProjectLibraryDetailClient';

export function generateStaticParams() {
  return engelabProjects.map((project) => ({ slug: project.slug }));
}

export default async function BibliotecaProjetoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = engelabProjects.find((item) => item.slug === slug);

  if (!project) notFound();

  return <ProjectLibraryDetailClient project={project} />;
}
