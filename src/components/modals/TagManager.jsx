import { Tag, Pencil, Trash2, Plus, X } from "lucide-react";
import { useState } from "react";

export default function TagManager({ open, onClose }) {
  const [tags, setTags] = useState([
    { id: 1, name: "Work", color: "#3B82F6" },
    { id: 2, name: "Personal", color: "#10B981" },
    { id: 3, name: "Important", color: "#EF4444" },
  ]);

  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (!newTag.trim()) return;

    setTags([
      ...tags,
      {
        id: Date.now(),
        name: newTag,
        color: "#6366F1",
      },
    ]);

    setNewTag("");
  };

  const deleteTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const editTag = (id) => {
    const updated = prompt(
      "Edit tag",
      tags.find((t) => t.id === id)?.name
    );

    if (!updated) return;

    setTags(
      tags.map((tag) =>
        tag.id === id ? { ...tag, name: updated } : tag
      )
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Tag size={18} />
            Manage Tags
          </h2>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Add Tag */}

        <div className="mb-5 flex gap-2">
          <input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="New tag..."
            className="flex-1 rounded-lg border px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
          />

          <button
            onClick={addTag}
            className="rounded-lg bg-blue-600 px-3 text-white hover:bg-blue-700"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Tag List */}

        <div className="space-y-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center justify-between rounded-lg border p-3 dark:border-zinc-700"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: tag.color }}
                />

                <span>{tag.name}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => editTag(tag.id)}
                  className="rounded p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => deleteTag(tag.id)}
                  className="rounded p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}