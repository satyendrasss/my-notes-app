import { useEffect, useRef, useState } from "react";
import * as Icons from "lucide-react";
import { formatFullDateTime } from "../utils/dateUtils";

export default function NoteActionMenu({
    note,
    onAddTag,
    onArchive,
    onTrash,
    onFavorite,
}) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);

    const actions = [
        {
            label: note.isFavorite ? "Remove Favorite" : "Add Favorite",
            icon: Icons.Star,
            onClick: () => onFavorite(note),
        },
        {
            label: "Manage Tags",
            icon: Icons.Tag,
            onClick: () => onAddTag(note),
        },
        {
            label: note.isArchived ? "Unarchive" : "Archive",
            icon: Icons.Archive,
            onClick: () => onArchive(note),
        },
        {
            label: note.isDeleted ? "Restore" : "Move to Trash",
            icon: note.isDeleted ? Icons.RefreshCcw : Icons.Trash2,
            onClick: () => onTrash(note),
            danger: true,
        },
    ];

    return (
        <div ref={menuRef} className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
                <Icons.MoreHorizontal size={18} />
            </button>

            {open && (
                <div className="absolute right-0 top-10 z-50 w-72 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                    {/* Actions */}
                    <div className="p-1">
                        {actions.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.label}
                                    onClick={() => {
                                        item.onClick();
                                        setOpen(false);
                                    }}
                                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${item.danger
                                            ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                                        }`}
                                >
                                    <Icon
                                        size={16}
                                        fill={
                                            item.icon === Icons.Star && note.favorite
                                                ? "currentColor"
                                                : "none"
                                        }
                                    />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-zinc-200 dark:border-zinc-700" />

                    {/* Note Information */}
                    <div className="space-y-2 bg-zinc-50 px-4 py-3 text-xs dark:bg-zinc-900/50">
                        <div className="flex justify-between">
                            <span className="text-zinc-500">ID</span>
                            <span className="font-medium text-zinc-700 dark:text-zinc-300">
                                {note.id}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-zinc-500">Created</span>
                            <span className="text-right text-zinc-700 dark:text-zinc-300">
                                {formatFullDateTime(note.createdAt)}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-zinc-500">Modified</span>
                            <span className="text-right text-zinc-700 dark:text-zinc-300">
                                {formatFullDateTime(note.updatedAt)}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}