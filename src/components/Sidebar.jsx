import {
  Home,
  Folder,
  Star,
  Archive,
  Trash,
  Tag,
  Settings,
  Plus,
  Pencil,
  Trash2,
  Settings2,
  UserCircle2,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import TagTodo from "./tags/TagTodo";


export default function Sidebar({ currentSection, setCurrentSection, }) {

  const menuItems = [
    { name: "Notes", icon: Home },
    // { name: "Files", icon: Folder },
    { name: "Favorites", icon: Star },
    { name: "Archive", icon: Archive },
    { name: "Trash", icon: Trash },
  ];

  
  return (
    <aside className="flex h-screen w-52 flex-col border-r border-zinc-200 bg-zinc-50 px-3 py-4 dark:border-zinc-800 dark:bg-zinc-900">
      <h1 className="mb-4 px-2 text-xl font-bold text-zinc-900 dark:text-white">
        My Notes
      </h1>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = currentSection === item.name;

          return (
            <button
              key={item.name}
              onClick={() => setCurrentSection(item.name)}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition
                ${active
                  ? "bg-zinc-300 text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
            >
              <Icon size={16} />
              {item.name}
            </button>
          );
        })}

        <TagTodo />

        
      </nav>

      <div className="mt-auto border-t border-zinc-200 pt-3 dark:border-zinc-800">
        <button className="mb-2 flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800">
          <Settings size={16} />
          Settings
        </button>

        <ThemeToggle />

        {/* <div className="flex gap-1 mt-2">
          <UserCircle2 />
          <UserCircle2 />
          <UserCircle2 />
          <UserCircle2 />
          <UserCircle2 />
          <UserCircle2 />
        </div> */}

      </div>
    </aside>
  );
}