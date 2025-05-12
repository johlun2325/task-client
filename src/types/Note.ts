export type Note = {
  uid: string;
  userUid: string;
  type: string;
  title: string;
  text: string | null;
  createdAt: number;
  updatedAt: number;
};

// payload
export type NewNote = {
    title: string;
    text: string | null;
};

  // for partial updates
  export type NoteUpdate = Partial<Note>;