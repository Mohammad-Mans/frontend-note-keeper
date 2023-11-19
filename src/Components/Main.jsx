import { useEffect, useState } from "react";
import "./Main.css";
import AddNotesField from "./AddNotesField";
import Notes from "./Notes";
import { fetchNotes, addNote, deleteNote, updateNote } from './CRUDNoteAPI';

function Main({ filter }) {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (filter.length > 0) {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(filter.toLowerCase()) ||
          note.content.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(null);
    }
  }, [filter, notes]);

  const fetchData = async () => {
    const data = await fetchNotes();
    setNotes(data);
  };

  const handleAddNote = async (note) => {
    await addNote(note);
    fetchData();
  };

  const handleDeleteNote = async (noteId) => {
    await deleteNote(noteId);
    fetchData();
  };

  const handleUpdateNote = async (noteId, updatedNote) => {
    await updateNote(noteId, updatedNote);
    fetchData();
  };

  return (
    <main className="main">
      <AddNotesField onAddNote={handleAddNote} />
      <Notes
        notes={filteredNotes ? filteredNotes : notes}
        onDeleteNote={handleDeleteNote}
        onUpdateNote={handleUpdateNote}
      />
    </main>
  );
}

export default Main;
