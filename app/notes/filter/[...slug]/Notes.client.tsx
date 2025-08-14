"use client";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import { Loader } from "@/components/Loader/Loader";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { ErrorMessageEmpty } from "@/components/ErrorMessageEmpty/ErrorMessageEmpty";

import NoteList from "@/components/NoteList/NoteList";
import { Modal } from "@/components/Modal/Modal";
import { NoteForm } from "@/components/NoteForm/NoteForm";

import { useDebounce } from "use-debounce";
import { Toaster } from "react-hot-toast";
import { Note } from "@/types/note";

interface NotesClientProps {
  initialData: {
    notes: Note[];
    totalPages: number;
  };

  initialTag: string;
}

export default function NotesClient({
  initialData,

  initialTag,
}: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000);
  const [tag, setTag] = useState(initialTag);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    setTag(initialTag);
    setCurrentPage(1);
  }, [initialTag]);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["notes", debouncedQuery, currentPage, tag],
    queryFn: () => fetchNotes(debouncedQuery, currentPage, tag),
    placeholderData: keepPreviousData,
    initialData,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleCreateNote = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => setIsOpenModal(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={query} onChange={handleChange} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            page={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
          />
        )}
        <button onClick={handleCreateNote} className={css.button}>
          Create note +
        </button>
      </div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <Toaster position="top-right" />
      {isSuccess && data?.notes.length === 0 && <ErrorMessageEmpty />}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
