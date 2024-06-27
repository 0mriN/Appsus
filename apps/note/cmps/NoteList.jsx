const { Link } = ReactRouterDOM

import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ notes, removeNote }) {

    return (
        <div className="note-list">
            {notes.map(note =>
                <Link key={note.id} to={`/note/edit/${note.id}`}>
                    <article className="note-card" style={note.style}>
                        <NotePreview
                            note={note}
                            removeNote={removeNote}
                        />
                    </article>
                </Link>
            )}
        </div>
    )
}