// hooks/useNoteActions.js
import { saveNotes } from "../utils/storage";
import { MY_NOTES } from "../utils/constraint";

export default function useNoteActions(notes, setNotes, selectedNote, setSelectedNote ) {
    const updateNotes = (updater) => {
        setNotes((prev) => {
            const updated = updater(prev);
            saveNotes(MY_NOTES, updated);
            return updated;
        });
    };

    const updateSelected = (updatedNote) => {
        if (selectedNote?.id === updatedNote.id) {
            setSelectedNote(updatedNote);
        }
    };

    const updateNote = (noteId, changes) => {
        updateNotes((prev) =>
            prev.map((note) => {
                if (note.id !== noteId) return note;

                const updatedNote = {
                    ...note,
                    ...changes,
                    updatedAt: new Date().toISOString(),
                };

                updateSelected(updatedNote);

                return updatedNote;
            })
        );
    };

    const toggleFavorite = (noteId) => {
        const note = notes.find((n) => n.id === noteId);
        if (!note) return;
        updateNote(noteId, {
            isFavorite: !note.isFavorite,
        });
    };

    const toggleArchive = (noteId) => {
        const note = notes.find((n) => n.id === noteId);
        if (!note) return;
        updateNote(noteId, {
            isArchived: !note.isArchived,
        });
    };

    const toggleTrash = (noteId) => {
        const note = notes.find((n) => n.id === noteId);
        if (!note) return;

        updateNote(noteId, {
            isDeleted: !note.isDeleted,
        });
    };

    const deleteForever = (noteId) => {
        updateNotes((prev) =>
            prev.filter((note) => note.id !== noteId)
        );

        if (selectedNote?.id === noteId) {
            setSelectedNote(null);
        }
    };

    return {
        updateNote,
        toggleFavorite,
        toggleArchive,
        toggleTrash,
        deleteForever,
    };
}