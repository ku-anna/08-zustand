import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tagNote = slug[0] === "All" ? "" : slug[0];
  const initialData = await fetchNotes("", 1, tagNote);

  return <NotesClient initialData={initialData} initialTag={tagNote} />;
}

// META

export const metadata: Metadata = {
  title: "Welcome to the notes dashboard",
  description: "You'll find all your notes here",
  openGraph: {
    title: "Welcome to the notes dashboard",
    description: "You'll find all your notes here",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notes Dashboard",
      },
    ],
  },
};
