const apiUrl = "https://technotes-api.onrender.comd";

export const fetchNotes = async () => {
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch notes");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const addNote = async (note) => {
  try {
    const response = await fetch(apiUrl, {
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
    } else {
      console.error("Failed to add note");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteNote = async (noteId) => {
  try {
    const response = await fetch(`${apiUrl}/${noteId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Note deleted successfully");
    } else {
      console.error("Failed to delete note");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateNote = async (noteId, updatedNote) => {
  try {
    const response = await fetch(`${apiUrl}/${noteId}`, {
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
    } else {
      console.error("Failed to update note");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
