export type Note = {
  uid: string;
  userUid: string;
  type: string;
  title: string;
  text: string;
  createdAt: number;
  updatedAt: number;
};

// payload
export type NewNote = {
    title: string;
    text: string;
};

  // for partial updates
  export type NoteUpdate = Partial<Note>;