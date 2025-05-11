export type Note = {
  uid: string;
  userUid: string;
  type: string;
  title: string;
  text: string | null;
  createdAt: number;
  updatedAt: number;
};

  // for note without id field
  export type NewNote = Omit<Note, 'uid'>;

  // for partial updates
  export type NoteUpdate = Partial<Note>;