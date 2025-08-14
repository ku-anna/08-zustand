import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tagNote = slug[0] === "All" ? "" : slug[0];
  const initialData = await fetchNotes("", 1, tagNote);

  return <NotesClient initialData={initialData} initialTag={tagNote} />;
}
