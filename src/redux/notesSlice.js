import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: JSON.parse(localStorage.getItem("notes")) || []
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(
        (note) => note.id !== action.payload);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    updateNote: (state, action) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id);
      state.notes[index] = {
        ...state.notes[index], ...action.payload
      }
      localStorage.setItem("notes", JSON.stringify(state.notes))
    }
  },
});

export const {
  addNote,
  deleteNote,
  updateNote,
} = notesSlice.actions;
export default notesSlice.reducer;