import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingsNotesMain, NotesState, ScheduleBox } from "../types/schedule";
import { storage } from "../utils/storage";

const initialData = storage.load();

const initialState: NotesState = {
    listNotes: initialData.listNotes,
    searchTerm: "",
    background: initialData.background,
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
        setUpdSettingsNotesMain: (state, action: PayloadAction<any>) => {
          state.background = action.payload;
        },
        setStateNote: (state, action: PayloadAction<ScheduleBox>) => {
            const index = state.listNotes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {                
                state.listNotes[index] = { ...action.payload, state: !action.payload.state } ;
            }
            
        },
    }}) 

// Selector para obtener las notas filtradas
export const selectFilteredNotes = (state: { notes: NotesState }) => {
    const { listNotes, searchTerm } = state.notes;
  
    // Si no hay término de búsqueda, devolvemos todas las notas
    if (!searchTerm) return listNotes;
  
    // Si hay un término de búsqueda, filtramos las notas
    return listNotes.filter((note) => {
      const titleMatch = note.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = note.description?.toLowerCase().includes(searchTerm);

      return titleMatch || descriptionMatch;
    });
  };
// Seleccion del bgMain
export const selectBackgroundNotes = (state: { notes: NotesState }) => {
    const { background } = state.notes;
    return background;
};

// Exportar acciones de manera correcta
    export const { 
        addNotes,
        editNotes,
        deleteNotes,
        setSearchTerm,
        setNotes,
        setStateNote,

        setUpdSettingsNotesMain,
    } = notesSlice.actions;
    
// Exportar el reducer
export default notesSlice.reducer;

