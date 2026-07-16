import { getContentSize } from "../utils/calculateSize";
import { formatFullDateTime } from "../utils/dateUtils";

export default function NoteFooter({ note }) {
  
  if (!note) return null;

  const characterCount = note.content.length;
  const wordCount = note.content.trim()
    ? note.content.trim().split(/\s+/).length
    : 0;

  return (
    <footer className="flex h-9 items-center justify-between border-t border-zinc-200 bg-zinc-50 px-4 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
      <div className="flex items-center gap-4 overflow-hidden">
        <span>
          <strong>ID:</strong> {note.id}
        </span>

        <span>
          <strong>Created:</strong>{" "}
          {formatFullDateTime(note.createdAt)}
        </span>

        <span>
          <strong>Modified:</strong>{" "}
          {formatFullDateTime(note.updatedAt)}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* <span>
          <strong>Size:</strong>{" "}
          {getContentSize(note.content)}
        </span> */}

        <span>{wordCount} words</span>
        <span>{characterCount} characters</span>
      </div>
    </footer>
  );
}