import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotesState, ScheduleBox } from "../types/schedule";


const initialState: NotesState = {
    listNotes: [],
    searchTerm: "",
}

export const notesSlice = createSlice({
    name: "notes",
    initialState, 
    reducers: {
        addNote: (state, action: PayloadAction<ScheduleBox>) => {
            state.listNotes = [ ...state.listNotes, action.payload ];
        },
        editNote: (state, action: PayloadAction<ScheduleBox>) => {
            const index = state.listNotes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
              // Reemplazar la caja editada utilizando el spread operator para mantener la inmutabilidad
              state.listNotes = state.listNotes.map((note, i) =>
                i === index ? action.payload : note
              );
            }
        },
        deleteNote: (state, action: PayloadAction<string>) => {
            // Filtramos sin mutar el estado
            state.listNotes = state.listNotes.filter(note => note.id !== action.payload);
        },
        // Búsqueda por título 
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload.toLowerCase();
        },
    }}) 

// Selector para obtener las notas filtradas
export const selectFilteredNotes = (state: { notes: NotesState }) => {
    const { listNotes, searchTerm } = state.notes;
    return listNotes.filter(note =>
        note.title.toLowerCase().includes(searchTerm) ||
        note.description?.toLowerCase().includes(searchTerm)
    );
};


// Exportar acciones de manera correcta
    export const { 
        addNote,
        editNote,
        deleteNote,
        setSearchTerm,
    } = notesSlice.actions;
    
// Exportar el reducer
export default notesSlice.reducer;

