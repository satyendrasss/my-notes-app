import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import NotesList from "./NotesList";
import Editor from "./Editor";
import { loadNotes, saveNotes } from "../utils/storage";
import { formatFullDateTime } from "../utils/dateUtils";
import { MY_NOTES } from "../utils/constraint";

export default function Layout() {

  const [currentSection, setCurrentSection] = useState("Notes");
  const [notes, setNotes] = useState(() => loadNotes(MY_NOTES) || []);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    setSelectedNote(null);
  }, [currentSection]);

  const handleNoteChange = (noteData) => {
    if (!selectedNote) {
      addNewNote({
        ...noteData,
        id: Date.now(),
        title: noteData.title || formatFullDateTime(Date.now()),
        isFavorite: false,
        isArchived: false,
        isDeleted: false,
        folder: "Notes",
        tags: noteData.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return;
    }
    console.log('changing...')
    setSelectedNote(noteData);
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteData.id ? noteData : note
      )
    );

  };

  const addNewNote = (note = null) => {
    const newNote =
      note ?? {
        id: Date.now(),
        title: formatFullDateTime(Date.now()),
        content: "",
        isFavorite: false,
        isArchived: false,
        isDeleted: false,
        folder: "Notes",
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

    setNotes((prev) => {
      const updated = [newNote, ...prev];
      saveNotes("MY_NOTES", updated);
      return updated;
    });

    setSelectedNote(newNote);

    return newNote;
  };

  const handleSave = (updatedNote) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) =>
        note.id === updatedNote.id
          ? updatedNote
          : note
      );

      saveNotes("MY_NOTES", updatedNotes);
      console.log('Saving...')
      return updatedNotes;
    });
  };

  // Toggle any boolean property
  const toggleNoteProperty = (noteId, property) => {
    setNotes((prev) => {
      const updated = prev.map((note) =>
        note.id === noteId
          ? {
            ...note,
            [property]: !note[property],
            updatedAt: new Date().toISOString(),
          }
          : note
      );

      saveNotes("MY_NOTES", updated);

      return updated;
    });

    setSelectedNote((prev) =>
      prev?.id === noteId
        ? {
          ...prev,
          [property]: !prev[property],
          updatedAt: new Date().toISOString(),
        }
        : prev
    );
  };

  /*
  // Favorite / Unfavorite
  const toggleFavorite = (noteId) => {
    toggleNoteProperty(noteId, "isFavorite");
  };

  // Archive / Unarchive
  const toggleArchive = (noteId) => {
    toggleNoteProperty(noteId, "isArchived");
  };

  // Move to Trash / Restore
  const toggleTrash = (noteId) => {
    toggleNoteProperty(noteId, "isDeleted");
  };

  // Permanently Delete
  const permanentlyDeleteNote = (noteId) => {
    setNotes((prev) => {
      const updated = prev.filter((note) => note.id !== noteId);

      saveNotes("MY_NOTES", updated);

      return updated;
    });

    setSelectedNote((prev) =>
      prev?.id === noteId ? null : prev
    );
  };

  */


  return (
    <div className="flex h-screen overflow-hidden bg-white text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-white">
      {/* Sidebar */}
      <Sidebar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      {/* Notes List */}
      {/* <div className="w-80 border-l border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"> */}
      <div className="w-80 border-l border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <NotesList
          notes={notes}
          currentSection={currentSection}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          addNewNote={() => addNewNote()}
        />
      </div>

      {/* Editor */}
      <div className="flex-1 border-l border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">

        <Editor note={selectedNote} onChange={handleNoteChange} onSave={handleSave} />

      </div>
    </div>
  );
}