import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";

const NoteDetailsPage = () => {
  const [note, setnote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes/${id}`);
        const data = await response.json();
        setnote(data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want delete this note")) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/notes/${note._id}`, { method: "DELETE" });
      toast.success("Note Deleted");
      navigate("/");
    } catch (error) {
      toast.error("falied to delete Note");
    }
  };

  const handleSave = async () => {
    const { title, content } = note;
    if (!title || !content) {
      toast.error("All Filds are required");
      return;
    }
    setSaving(true);

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/notes/${note._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      toast.success("Note Change is successfuly!");
      navigate("/");
    } catch (error) {
      console.log("Error Changing Note", error);
      toast.error("Failed to Change note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to notes
            </Link>
            <button className="btn btn-error btn-outline" onClick={handleDelete}>
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Edit Note</h2>
              <div className="form-control flex flex-col gap-2 mb-4">
                <label htmlFor="title" className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={note.title}
                  onChange={(e) => setnote({ ...note, title: e.target.value })}
                  placeholder="Note Title"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control flex flex-col gap-2 mb-4 ">
                <label htmlFor="content" className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  id="content"
                  value={note.content}
                  onChange={(e) => setnote({ ...note, content: e.target.value })}
                  placeholder="Write Your note here..."
                  className="textarea textarea-bordered h-32 resize-none w-full"
                />
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Note"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailsPage;
