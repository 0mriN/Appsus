import { noteService } from "../services/note.service.js";
import { NoteList } from "../cmps/NoteList.jsx";
import { AddNote } from "../cmps/AddNote.jsx";
import { Accordion } from "../cmps/Accordion.jsx";

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
        <React.Fragment>
            <header className="note-header">
                <img src="./assets/img/keep-logo.png"></img>
            </header>
            <section className="note-index">
                {/* <AddNote /> */}
                <Accordion />
                <NoteList
                    notes={notes}
                    removeNote={removeNote}
                />
            </section>
        </React.Fragment>
    )
}
