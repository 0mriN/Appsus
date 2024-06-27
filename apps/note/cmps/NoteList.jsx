import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ notes, removeNote }) {

    return (
        <div className="note-list">
            {notes.map(note =>
                <article key={note.id} style={note.style}>
                    <NotePreview 
                    note={note} 
                    removeNote={removeNote}
                    />
                </article>
            )}
        </div>
    )
}