import { fetchNotes,} from '@/lib/api'
import type { FilterTag } from '@/types/note';
import NotesClient from './Notes.client'
import type { Metadata } from 'next';

const siteUrl =process.env.NEXT_PUBLIC_SITE_URL ?? 'https://notehub-yourname.vercel.app';
type PageProps ={params:{ slug?: string[] }};


const asFilterTag = (raw?: string): FilterTag => {
  const allowed: FilterTag[] = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
  const v = (raw ?? 'All') as FilterTag;
  return allowed.includes(v) ? v : 'All';};
const humanize = (tag?: string) => tag && tag !== '' ? `“${tag}”` : 'All notes';
export async function generateMetadata({
  params,}:{params: {slug: string[]};}):Promise<Metadata>{
const tag = Array.isArray(params.slug) && params.slug.length > 0
  ? params.slug[0]
  : '';
const title =`Notes - ${humanize(tag)} | NoteHub`;
const description = `Browse notes filtered by ${humanize(tag)} in NoteHub.`;
const url = tag ? `${siteUrl}/notes/filter/${tag}` : `${siteUrl}/notes/filter/All`;

return{
title,description,
openGraph:{
  title,description,url,
  images:[{ url:'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'}],
},
};
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const { slug } = await params;
  const filterTag: FilterTag = asFilterTag(slug?.[0]);
  const initialData = await fetchNotes({
    page: 1,
    perPage: 12,
    tag: filterTag,
    search: '',
  });
  return <NotesClient initialData={initialData} filterTag={filterTag} />;
}


