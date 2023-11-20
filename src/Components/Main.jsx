import { useEffect, useState } from "react";
import "./Main.css";
import AddNotesField from "./AddNotesField";
import Notes from "./Notes";

function Main({ filter }) {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState(null);
  const api = "https://notekeeper-api-ltm8.onrender.com/notes/";

  useEffect(() => {
    
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
    try {
      const response = await fetch(api);
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        console.error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddNote = async (note) => {
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: note.title,
          content: note.content,
        }),
      });

      if (response.ok) {
        console.log("Note added successfully");
        fetchData();
      } else {
        console.error("Failed to add note");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const response = await fetch(`${api}/${noteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Note deleted successfully");
        fetchData();
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateNote = async (noteId, updatedNote) => {
    try {
      const response = await fetch(`${api}/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedNote.title,
          content: updatedNote.content,
        }),
      });

      if (response.ok) {
        console.log("Note updated successfully");
        fetchData();
      } else {
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
