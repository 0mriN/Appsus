import { noteService } from "../services/note.service.js";
import { NoteList } from "../cmps/NoteList.jsx";
import { AddNote } from "../cmps/AddNote.jsx";

const { useEffect, useState } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [notes])

    function loadNotes() {
        noteService.query()
            .then(notes => {
                setNotes(notes)
            })
    }

    function removeNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => noteId !== note.is))
            })
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <AddNote />
            <NoteList
                notes={notes}
                removeNote={removeNote}
            />
        </section>
    )
}
