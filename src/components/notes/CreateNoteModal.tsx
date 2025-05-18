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
        <DialogPanel className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl mx-auto">
          <DialogTitle className="text-2xl font-semibold mb-6">
            {existingNote ? "Edit Note" : "Create Note"}
          </DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Note title"
                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="noteText" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="noteText"
                placeholder="Write your note here..."
                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={12}
                style={{ minHeight: "250px", resize: "vertical" }}
              />
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
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
                  className="text-red-600 hover:text-red-800 font-medium hover:underline"
                >
                  Delete Note
                </button>
              ) : (
                <div />
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {existingNote ? "Update Note" : "Save Note"}
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
