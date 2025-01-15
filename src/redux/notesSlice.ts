import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotesState, ScheduleBox } from "../types/schedule";
import { storage } from "../utils/storage";

const initialState: NotesState = {
    listNotes: storage.load() || [],
    searchTerm: "",
}

export const notesSlice = createSlice({
    name: "notes",
    initialState, 
    reducers: {
        addNotes: (state, action: PayloadAction<ScheduleBox>) => {
            state.listNotes = [ ...state.listNotes, action.payload ];

        },
        editNotes: (state, action: PayloadAction<ScheduleBox>) => {
            const index = state.listNotes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                // Reemplazar el elemento en la posición correspondiente de manera inmutable
                state.listNotes[index] = action.payload;
            }
        },        
        deleteNotes: (state, action: PayloadAction<string>) => {
            // Filtramos sin mutar el estado
            state.listNotes = state.listNotes.filter(note => note.id !== action.payload);
        },
        // Búsqueda por título 
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload.toLowerCase();
        },
        setNotes: (state, action: PayloadAction<ScheduleBox[]>) => {
          state.listNotes = action.payload;
        },
    }}) 

// Selector para obtener las notas filtradas
export const selectFilteredNotes = (state: { notes: NotesState }) => {
    const { listNotes, searchTerm } = state.notes;
  
    // Si no hay término de búsqueda, devolvemos todas las notas
    if (!searchTerm) return listNotes;
  
    // Si hay un término de búsqueda, filtramos las notas
    return listNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm) ||
        note.description?.toLowerCase().includes(searchTerm)
    );
  };

// Exportar acciones de manera correcta
    export const { 
        addNotes,
        editNotes,
        deleteNotes,
        setSearchTerm,
        setNotes,
    } = notesSlice.actions;
    
// Exportar el reducer
export default notesSlice.reducer;

