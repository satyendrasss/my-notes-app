import { useDeferredValue, useMemo, useState } from "react";
import { formatFullDateTime } from "../utils/dateUtils";
import TagBadge from "./tags/TagBadge";
import { Archive, Star, Trash2 } from "lucide-react";

export default function NotesList({ notes = [], currentSection, selectedNote, setSelectedNote, addNewNote }) {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const filteredNotes = useMemo(() => {

    let result = [...notes];
    switch (currentSection) {
      case "Favorites":
        result = result.filter(note => note.isFavorite);
        break;

      case "Archive":
        result = result.filter(note => note.isArchived);
        break;

      case "Trash":
        result = result.filter(note => note.isDeleted);
        break;

      case "Files":
        result = result.filter(note => note.folder === "Files");
        break;

      case "Tags":
        result = result.filter(note => (note.tags ?? []).length > 0);
        break;

      default:
        result = result.filter(note => !note.isArchived && !note.isDeleted);
    }

    if (deferredSearch.trim()) {

      const query = deferredSearch.toLowerCase();
      result =
        result.filter(note => {
          const title = note.title?.toLowerCase() ?? "";
          const content = note.content?.toLowerCase() ?? "";
          return (
            title.includes(query) ||
            content.includes(query)
          );
        });
    }

    return result;

    // newest first

    // return result.sort(
    //   (a, b) =>
    //     new Date(b.updatedAt || b.createdAt)
    //     -
    //     new Date(a.updatedAt || a.createdAt)
    // );

  }, [
    notes,
    currentSection,
    deferredSearch
  ]);


  return (
    <div className="flex h-full flex-col bg-white text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-white">

      {/* Header */}
      <div className="border-b border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">

        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              {currentSection}
            </h2>

            <p className="text-xs text-zinc-500">
              {filteredNotes.length} note{filteredNotes.length !== 1 && "s"}
            </p>
          </div>

          <button
            onClick={addNewNote}
            className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            +
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${currentSection.toLowerCase()}...`}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
      </div>

      {/* Notes */}
      <div className="flex-1 overflow-y-auto">

        {filteredNotes.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
            No notes found.
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`cursor-pointer border-b border-zinc-200 px-3 py-3 transition dark:border-zinc-800 ${selectedNote?.id === note.id
                ? "border-l-4 border-l-blue-600 bg-blue-100 dark:bg-zinc-800"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate text-sm font-semibold">
                  {note.title || "Untitled"}
                </h3>

                <div className="flex items-center gap-1">
                  {note.isFavorite && (
                    <Star
                      size={14}
                      className="text-orange-500"
                      fill="currentColor"
                    />
                  )}

                  {note.isArchived && (
                    <Archive
                      size={14}
                      className="text-zinc-500"
                    />
                  )}

                  {note.isDeleted && (
                    <Trash2
                      size={14}
                      className="text-red-500"
                    />
                  )}
                </div>
              </div>

              <p className="mt-1 line-clamp-1 text-sm text-zinc-900 dark:text-zinc-300">
                {note.content}
              </p>
              <small className="text-xs text-zinc-600 dark:text-zinc-400">{formatFullDateTime(note.createdAt)}</small>


              {note.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {note.tags.map((tag) => (
                    <TagBadge
                      key={tag.id}
                      tag={tag}
                    // removable 
                    // onRemove={() => removeTag(tag.id)} 
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        )}

      </div>
    </div>
  );
}