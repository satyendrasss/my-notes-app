import {
  Star,
  Archive,
  ArchiveRestore,
  Trash2,
  RotateCcw,
  Trash,
  X,
} from "lucide-react";

export default function NoteSettingsModal({
  open,
  note,
  onClose,
  onToggleFavorite,
  onToggleArchive,
  onToggleTrash,
  onDeleteForever,
}) {
  if (!open || !note) return null;

  const isTrash = note.isDeleted;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl dark:bg-zinc-900">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <div>
            <h2 className="text-lg font-semibold">
              Note Settings
            </h2>

            <p className="mt-1 truncate text-sm text-zinc-500">
              {note.title || "Untitled"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Actions */}
        <div className="p-4">

          {!isTrash ? (
            <div className="space-y-2">

              <ActionButton
                icon={<Star size={18} />}
                title={
                  note.isFavorite
                    ? "Remove from Favorites"
                    : "Add to Favorites"
                }
                onClick={() => {
                  onToggleFavorite(note.id);
                  onClose();
                }}
              />

              <ActionButton
                icon={
                  note.isArchived ? (
                    <ArchiveRestore size={18} />
                  ) : (
                    <Archive size={18} />
                  )
                }
                title={
                  note.isArchived
                    ? "Unarchive"
                    : "Archive"
                }
                onClick={() => {
                  onToggleArchive(note.id);
                  onClose();
                }}
              />

              <ActionButton
                danger
                icon={<Trash2 size={18} />}
                title="Move to Trash"
                onClick={() => {
                  onToggleTrash(note.id);
                  onClose();
                }}
              />

            </div>
          ) : (
            <div className="space-y-2">

              <ActionButton
                icon={<RotateCcw size={18} />}
                title="Restore Note"
                onClick={() => {
                  onToggleTrash(note.id);
                  onClose();
                }}
              />

              <ActionButton
                danger
                icon={<Trash size={18} />}
                title="Delete Permanently"
                onClick={() => {
                  if (
                    window.confirm(
                      "Permanently delete this note?"
                    )
                  ) {
                    onDeleteForever(note.id);
                    onClose();
                  }
                }}
              />

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="border-t border-zinc-200 px-6 py-4 text-right dark:border-zinc-800">
          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

function ActionButton({
  icon,
  title,
  danger = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition
        ${
          danger
            ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }`}
    >
      {icon}

      <span className="font-medium">
        {title}
      </span>
    </button>
  );
}