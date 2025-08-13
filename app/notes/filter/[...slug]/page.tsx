import { fetchNotes,} from '@/lib/api'
import type { FilterTag } from '@/types/note';
import NotesClient from './Notes.client'


type PageProps = {
  params: Promise< { slug: string[] }>
}
const asFilterTag = (raw?: string): FilterTag => {
  const allowed: FilterTag[] = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
  const v = (raw ?? 'All') as FilterTag;
  return allowed.includes(v) ? v : 'All';
};

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


