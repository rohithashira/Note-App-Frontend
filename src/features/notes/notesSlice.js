import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
  loading: false,
  error: null,
  currentNote: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    fetchNotesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchNotesSuccess: (state, action) => {
      state.loading = false;
      state.notes = action.payload;
    },
    fetchNotesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createNoteStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createNoteSuccess: (state, action) => {
      state.loading = false;
      state.notes.unshift(action.payload);
    },
    createNoteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateNoteStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateNoteSuccess: (state, action) => {
      state.loading = false;
      state.notes = state.notes.map(note =>
        note._id === action.payload._id ? action.payload : note
      );
    },
    updateNoteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteNoteStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteNoteSuccess: (state, action) => {
      state.loading = false;
      state.notes = state.notes.filter(note => note._id !== action.payload);
    },
    deleteNoteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentNote: (state, action) => {
      state.currentNote = action.payload;
    },
  },
});

export const {
  fetchNotesStart,
  fetchNotesSuccess,
  fetchNotesFailure,
  createNoteStart,
  createNoteSuccess,
  createNoteFailure,
  updateNoteStart,
  updateNoteSuccess,
  updateNoteFailure,
  deleteNoteStart,
  deleteNoteSuccess,
  deleteNoteFailure,
  setCurrentNote,
} = notesSlice.actions;

export default notesSlice.reducer; 