import { useEffect, useMemo, useRef, useState } from "react";
import { Tag, X, Plus, Search } from "lucide-react";
import TagBadge from "./TagBadge";

export default function TagSelector({
  selectedTags = [],
  allTags = [],
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () =>
      document.removeEventListener("mousedown", close);
  }, []);

  const tags = useMemo(() => {
    return allTags
      .filter(
        (tag) =>
          !selectedTags.some((t) => t.id === tag.id)
      )
      .filter((tag) =>
        tag.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
  }, [allTags, selectedTags, search]);

  const addTag = (tag) => {
    onChange([...selectedTags, tag]);
    setSearch("");
    setOpen(false);
  };

  return (
    <div className="relative mt-2" ref={ref}>
      {/* Selected */}

      <div className="flex flex-wrap items-center gap-2">
        {selectedTags.map((tag) => (
            <TagBadge
                key={tag.id}
                tag={tag}
                removable
                onRemove={()=>onChange(selectedTags.filter((t) => t.id !== tag.id))}
            />
        ))}

        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-1 rounded-md border border-dashed border-zinc-300 px-2 py-1 text-xs text-zinc-500 transition hover:border-blue-500 hover:text-blue-600 dark:border-zinc-700"
        >
          <Plus size={12} />
          Tag
        </button>
      </div>

      {/* Popover */}

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-60 rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 border-b border-zinc-200 px-3 py-2 dark:border-zinc-800">
            <Search size={14} />
            <input
              autoFocus
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search tags..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          <div className="max-h-56 overflow-y-auto py-1">
            {tags.length === 0 ? (
              <p className="px-3 py-3 text-xs text-zinc-500">
                No tags found
              </p>
            ) : (
              tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => addTag(tag)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Tag size={14} />
                  {tag.name}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}