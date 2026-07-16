import { useEffect, useState } from "react";
import * as Icons from "lucide-react";

const ICONS = [
    "Hash",
    "Tag",
    "Folder",
    "Bookmark",
    "Star",
    "Heart",

    "Briefcase",
    "User",
    "Users",
    "Home",

    "BookOpen",
    "Notebook",
    "PenTool",
    "Pencil",

    "Calendar",
    "Clock",
    "AlarmClock",

    "CheckCircle2",
    "Circle",
    "ListTodo",
    "Target",

    "Lightbulb",
    "Rocket",
    "Flame",
    "Zap",

    "ShoppingCart",
    "DollarSign",
    "CreditCard",

    "MapPin",
    "Globe",
    "Compass",

    "Camera",
    "Image",
    "Music",
    "Film",

    "Coffee",
    "Gift",
    "Gamepad2",
    "Dumbbell",

    "Laptop",
    "Smartphone",
    "Monitor",

    "Shield",
    "Lock",
    "Key",

    "Archive",
    "Package",
    "Inbox",
];

export default function TagModal({
    open,
    tag,
    onClose,
    onSave,
}) {
    const [name, setName] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("Hash");

    useEffect(() => {
        if (open) {
            setName(tag?.name || "");
            setSelectedIcon(tag?.icon || "Hash");
        }
    }, [tag, open]);

    if (!open) return null;

    const renderIcon = (iconName, size = 18) => {
        const Icon = Icons[iconName] || Icons.Tag;
        return <Icon size={size} />;
    };

    const handleSubmit = () => {
        if (!name.trim()) return;

        onSave({
            ...tag,
            name: name.trim(),
            icon: selectedIcon,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-200 p-4 dark:border-zinc-800">
                    <div>
                        <h2 className="text-lg font-semibold">
                            {tag ? "Edit Tag" : "New Tag"}
                        </h2>
                        <p className="text-xs text-zinc-500">
                            Create or edit a tag.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-md p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        <Icons.X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-4 p-4">

                    {/* Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Name
                        </label>

                        <input
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleSubmit()
                            }
                            placeholder="Work"
                            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800"
                        />
                    </div>

                    {/* Icons */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Icon
                        </label>

                        <div className="grid max-h-40 grid-cols-10 gap-2 overflow-y-auto pr-1">
                            {ICONS.map((iconName) => (
                                <button
                                    key={iconName}
                                    type="button"
                                    onClick={() => setSelectedIcon(iconName)}
                                    className={`flex h-8 w-8 items-center justify-center rounded-lg border transition
                                    ${selectedIcon === iconName
                                            ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/30"
                                            : "border-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                                        }`}
                                >
                                    {renderIcon(iconName, 15)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
                        <p className="mb-2 text-xs uppercase text-zinc-500">
                            Preview
                        </p>

                        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm shadow-sm dark:bg-zinc-700">
                            {renderIcon(selectedIcon, 15)}
                            {name || "Tag Name"}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2 border-t border-zinc-200 p-4 dark:border-zinc-800">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={!name.trim()}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {tag ? "Save" : "Create"}
                    </button>
                </div>

            </div>
        </div>
    );
}