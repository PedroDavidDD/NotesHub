export interface ScheduleBox {
  id: string;
  date: string;
  title: string;
  time: string;
  description?: string;
  backgroundColor: string;
  backgroundOpacity?: number;
  image?: string;
  tags?: string[];

  borderColor?: string;
  borderStyle?: string;
  borderWidth?: string;
  textAlign: string;
  
  order: number;
  particleColor: string;
  accentColor: string;
}

export interface NotesState {
  listNotes: ScheduleBox[];
  searchTerm: string;
}

