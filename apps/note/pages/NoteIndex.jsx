import { noteService } from "../services/note.service.js";
import { NoteList } from "../cmps/NoteList.jsx";

const { useEffect, useState } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(notes => {
                setNotes(notes)
            })
    }


    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <NoteList notes={notes} />
        </section>
    )
}
