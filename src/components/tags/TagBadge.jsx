import * as Icons from "lucide-react";

export default function TagBadge({tag, removable = false, onRemove,}) {
  const Icon = Icons[tag.icon] || Icons.Tag;
  return (
    <span className="inline-flex items-center gap-1 border border-zinc-300 dark:border-zinc-700 rounded-md bg-zinc-100 px-2 py-1 text-xs dark:bg-zinc-800">
      <Icon size={13} />
      {tag.name}
      {removable && (
        <button
          type="button"
          onClick={() => onRemove?.(tag)}
          className="ml-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700"
        >
          <Icons.X size={12} />
        </button>
      )}
    </span>
  );
}