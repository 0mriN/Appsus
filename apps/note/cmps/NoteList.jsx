import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ notes }) {

    return (
        <div className="note-list">
            {notes.map(note =>
                <article key={note.id} style={note.style}>
                    <NotePreview note={note} />
                </article>
            )}
        </div>
    )
}