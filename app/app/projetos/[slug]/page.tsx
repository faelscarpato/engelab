import ProjectDetailClient from './ProjectDetailClient';

export const runtime = 'edge';

export default async function ProjetoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ProjectDetailClient slug={slug} />;
}
