export interface Note {
    id: string;
    title: string;
    content: string;
  }
  
  // for note without id field
  export type NewNote = Omit<Note, 'id'>;