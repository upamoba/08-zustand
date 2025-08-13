import type { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://notehub-yourname.vercel.app';
type PageProps = { params: { id: string } };
export async function generateMetadata({
  params,
}:{params: {id: string};
 }): Promise<Metadata> {
  try {
    const note = await fetchNoteById(params.id);
    const title = `${note.title} | NoteHub`;
    const short =(note.content || '').trim().slice(0, 140) || 'Note details.';
   const description = short;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${siteUrl}/notes/${params.id}`,
        images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' }],
      },
    };
  } catch {
    const title = 'Note details | NoteHub';
    const description = 'Note details are not available.';;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${siteUrl}/notes/${params.id}`,
        images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' }],
      },
    };
  }
}

export default function NoteDetailsPage({ params }: PageProps) {
  return <NoteDetailsClient noteId={params.id} />;
}
