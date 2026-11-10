import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const NoteCard = ({ note }) => {
  const navigate = useNavigate();
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!confirm("Are you sure you want delete this note")) return;
    try {
      const response = await fetch(`http://localhost:5001/api/notes/${note._id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Note is deleted");
      }
      window.location.reload();
    } catch (error) {
      toast.error("falied Note deleted");
    }
  };
  return (
    <Link
      to={`note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D] "
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">{formatDate(note.createdAt)}</span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button onClick={handleDelete} className="btn btn-ghost btn-xs text-error">
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
