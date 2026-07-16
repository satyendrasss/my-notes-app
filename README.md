# 📝 My Notes

A modern, responsive note-taking application built with **React**, **Vite**, **Tailwind CSS v4**, and **IndexedDB**. It provides offline-first note management with support for tags, favorites, archives, trash, dark mode, and auto-save.

---

## ✨ Features

- 📒 Create, edit, and delete notes
- ⭐ Favorite notes
- 📦 Archive notes
- 🗑️ Trash and restore notes
- 🏷️ Tag management
- 🔍 Search notes
- 💾 Auto-save
- 🌙 Dark / Light theme
- 📱 Responsive design
- ⚡ Offline storage using IndexedDB
- 🔐 Ready for encrypted storage (AES-GCM)

---

## 📦 Tech Stack

- React
- Vite
- Tailwind CSS v4
- IndexedDB
- Lucide React Icons

---

## 📁 Project Structure

```
src/
│
├── components/
│   ├── Editor.jsx
│   ├── Layout.jsx
│   ├── NotesList.jsx
│   ├── Sidebar.jsx
│   ├── TagSelector.jsx
│   ├── TagTodo.jsx
│   ├── ThemeToggle.jsx
│   ├── NoteFooter.jsx
│   ├── NoteActionMenu.jsx
│   └── modals/
│
├── utils/
│   ├── storage.js
│   ├── dateUtils.js
│   └── constraint.js
│
├── App.jsx
└── main.jsx
```

---

## 🚀 Installation

Clone the repository

```bash
git clone <repository-url>
```

Go to project directory

```bash
cd my-notes
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Open

```
http://localhost:5173
```

---

## 🏗 Build

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

## 💾 Storage

The application stores all notes locally using **IndexedDB**.

Each note contains:

```js
{
  id,
  title,
  content,
  tags,
  folder,
  isFavorite,
  isArchived,
  isDeleted,
  createdAt,
  updatedAt
}
```

Tags are stored separately and referenced by notes.

---

## 📱 Responsive Layout

Desktop

```
+-----------+-------------+-----------------------+
| Sidebar   | Notes List  | Editor                |
+-----------+-------------+-----------------------+
```

Tablet

```
+-------------+-----------------------+
| Notes List  | Editor                |
+-------------+-----------------------+
```

Mobile

```
Notes List
     ↓
Editor
```

---

## 🎨 UI Features

- Auto save
- Search
- Tag selector
- Note actions
- Responsive layout
- Light & Dark themes
- Clean interface

---

## 🔐 Encryption

The storage layer is prepared for AES-GCM encryption using the Web Crypto API.

Future versions can enable:

- End-to-end encrypted notes
- User secret keys
- Password-derived encryption
- Secure synchronization

---

## 📋 Future Improvements

- Rich Text Editor (TipTap)
- Markdown Support
- Cloud Sync
- User Authentication
- Export / Import Notes
- Attachments
- Pin Notes
- Reminder Notifications
- Version History
- Collaboration

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Built with ❤️ using React, Vite, Tailwind CSS, and IndexedDB.