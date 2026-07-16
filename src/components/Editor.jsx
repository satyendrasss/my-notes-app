import { useEffect, useRef, useState } from "react";
import NoteFooter from "./NoteFooter";
import { loadTags } from "../utils/storage";
import { MY_TAGS } from "../utils/constraint";
import { formatFullDateTime } from "../utils/dateUtils";
import { Check, Loader2, RefreshCcw, RefreshCw, Settings, Settings2 } from "lucide-react";
import NoteActionMenu from "./NoteActionMenu";
import TagSelector from "./tags/TagSelector";
// import RichTextEditor from "./RichTextEditor";

export default function Editor({ note, onChange, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState(() => loadTags(MY_TAGS) || []);
  const hasCreatedNote = useRef(false);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  

  /**
   * Load selected note into editor
  */
  useEffect(() => {
    setTitle(note?.title ?? formatFullDateTime(Date.now()));
    setContent(note?.content ?? "");
    setTags(note?.tags ?? []);
  }, [note?.id]);

  /**
   * Reflect changes immediately in selected note
  */

  useEffect(() => {
    // Create a new note when the user starts typing
    if (!note) {
      if (!content.trim() || hasCreatedNote.current) return;

      hasCreatedNote.current = true;

      onChange({
        title,
        content,
        tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return;
    }

    const tagsChanged =
      JSON.stringify(tags.map(t => t.id)) !==
      JSON.stringify((note.tags ?? []).map(t => t.id));

    const hasChanged =
      title !== note.title ||
      content !== note.content ||
      tagsChanged;

    if (!hasChanged) return;

    onChange({
      ...note,
      title,
      content,
      tags,
      updatedAt: new Date().toISOString(),
    });

  }, [title, content, tags]);

  /**
   * Auto save after 2 seconds
   */
  useEffect(() => {
    if (!note) return;
    setSaving(true);

    const timer = setTimeout(() => {
      onSave({
        ...note,
        title,
        content,
        tags,
        updatedAt: new Date().toISOString(),
      });
      setSaving(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [title, content, tags, note?.isFavorite]);

  const handleFavorite = () => {
    onChange({
      ...note,
      isFavorite: !note.isFavorite,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleArchive = () => {
    onChange({
      ...note,
      isArchived: !note.isArchived,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleTrash = () => {
    onChange({
      ...note,
      isDeleted: !note.isDeleted,
      updatedAt: new Date().toISOString(),
    });
  };

  // 

  // console.log("Editor render", tags, note);


  return (
    <div className="flex h-full flex-col bg-white text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-white">

      {/* Title */}
      <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
        <div className="flex items-center justify-between gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled"
            className="flex-1 bg-transparent text-3xl font-bold outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
          />

          <div className="flex items-center">
            {saving ? (
              <RefreshCw
                size={18}
                className="animate-spin text-blue-500"
              />
            ) : (
              <Check
                size={18}
                className="text-green-500"
              />
            )}
          </div>

          {note &&
            <NoteActionMenu
              note={note}
              onFavorite={handleFavorite}
              onTrash={handleTrash}
              onArchive={handleArchive}
            />
          }

        </div>

        <div className="mt-4">
          <TagSelector
            selectedTags={tags}
            allTags={availableTags}
            onChange={setTags}
          />
        </div>
      </div>

      {/* Content */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
        className="flex-1 resize-none bg-transparent p-6 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
      />

      {/* <RichTextEditor 
        value={content}
        onChange={setContent}
      /> */}


      <NoteFooter note={note} />
    </div>
  );
}