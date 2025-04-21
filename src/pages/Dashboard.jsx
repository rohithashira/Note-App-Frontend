import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import {
  fetchNotesStart,
  fetchNotesSuccess,
  fetchNotesFailure,
  createNoteStart,
  createNoteSuccess,
  createNoteFailure,
  updateNoteStart,
  updateNoteSuccess,
  updateNoteFailure,
  deleteNoteStart,
  deleteNoteSuccess,
  deleteNoteFailure,
  setCurrentNote,
} from '../features/notes/notesSlice';
import notesService from '../services/notesService';

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { notes, loading, error, currentNote } = useSelector(
    (state) => state.notes
  );

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    if (!token) return;
    dispatch(fetchNotesStart());
    try {
      const fetchedNotes = await notesService.getNotes(token);
      dispatch(fetchNotesSuccess(fetchedNotes));
    } catch (err) {
      dispatch(fetchNotesFailure(err instanceof Error ? err.message : 'Failed to fetch notes'));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    if (isEditing && currentNote) {
      dispatch(updateNoteStart());
      try {
        const updatedNote = await notesService.updateNote(token, currentNote._id, {
          title,
          content,
        });
        dispatch(updateNoteSuccess(updatedNote));
        setIsEditing(false);
        setTitle('');
        setContent('');
        dispatch(setCurrentNote(null));
      } catch (err) {
        dispatch(updateNoteFailure(err instanceof Error ? err.message : 'Failed to update note'));
      }
    } else {
      dispatch(createNoteStart());
      try {
        const newNote = await notesService.createNote(token, { title, content });
        dispatch(createNoteSuccess(newNote));
        setTitle('');
        setContent('');
      } catch (err) {
        dispatch(createNoteFailure(err instanceof Error ? err.message : 'Failed to create note'));
      }
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(true);
    dispatch(setCurrentNote(note));
  };

  const handleDelete = async (id) => {
    if (!token) return;
    dispatch(deleteNoteStart());
    try {
      await notesService.deleteNote(token, id);
      dispatch(deleteNoteSuccess(id));
    } catch (err) {
      dispatch(deleteNoteFailure(err instanceof Error ? err.message : 'Failed to delete note'));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTitle('');
    setContent('');
    dispatch(setCurrentNote(null));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Notes App</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 text-sm text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Note content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows={4}
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading
                  ? 'Saving...'
                  : isEditing
                  ? 'Update Note'
                  : 'Create Note'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {note.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{note.content}</p>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleEdit(note)}
                    className="text-indigo-600 hover:text-indigo-900 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-red-600 hover:text-red-900 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 