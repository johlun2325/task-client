import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { apiService } from "../../services/ApiService";
import { Note } from "../../types/Note";

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => Promise<void>;
  existingNote?: Note | null;
}

const CreateNoteModal: React.FC<CreateNoteModalProps> = ({
  isOpen,
  onClose,
  onCreated,
  existingNote,
}) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setText(existingNote.text);
    } else {
      setTitle("");
      setText("");
    }
  }, [existingNote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (existingNote) {
        await apiService.note.update(existingNote.uid, {
          title,
          text,
        });
      } else {
        await apiService.note.create({
          title,
          text,
        });
      }

      await onCreated();
      onClose();
      setTitle("");
      setText("");
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <DialogTitle className="text-lg font-semibold mb-4">
            {existingNote ? "Edit Note" : "Create Note"}
          </DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full border px-3 py-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Text"
              className="w-full border px-3 py-2 rounded"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="flex justify-between items-center mt-4">
              {existingNote ? (
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await apiService.note.delete(existingNote.uid);
                      await onCreated();
                      onClose();
                    } catch (err) {
                      console.error("Failed to delete note:", err);
                    }
                  }}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              ) : (
                <div />
              )}{" "}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-500 hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {existingNote ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CreateNoteModal;
