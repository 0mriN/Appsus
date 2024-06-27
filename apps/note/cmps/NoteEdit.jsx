const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

export function NoteEdit() {
    const [noteToEdit, setNoteToEdit] = useState(null)
    const navigate = useNavigate()
    const { noteId } = useParams()

    useEffect(() => {
        console.log(noteToEdit);
        if (noteId) loadNote()
    }, [])

    function loadNote() {
        noteService.get(noteId)
            .then(setNoteToEdit)
            .catch(err => console.log('err:', err))
    }

    function onSaveNote(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(() => {
                console.log('navigate')
                navigate('/note')
            })
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setNoteToEdit(prevNote => ({
            ...prevNote,
            info:
                { ...prevNote.info, [field]: value }
        }))
    }

    function onImgInput(ev) {
        noteService.loadImageFromInput(ev, renderImg)
    }

    function renderImg(img) {
        console.log(imgRef)
        imgRef.src = img
    }

    if (!noteToEdit) return <div>Loading...</div>
    return (
        <section className="note-edit open">
            <div className="box-shadow">
                <form>
                    <section className="title-container" >


                        {noteToEdit.info.url &&
                            <img
                                className="hide"
                                src={`${noteToEdit.info.url}`}
                                alt=""
                            />}
                        <input
                            value={noteToEdit.info.title}
                            onChange={handleChange}
                            className="note-edit-title"
                            type="text"
                            name="title"
                            placeholder="Take a note..."
                        />
                    </section>
                    <section className="content">
                        <input
                            value={noteToEdit.info.txt}
                            onChange={handleChange}
                            className="note-edit-txt"
                            type="text"
                            name="txt"
                            placeholder="txt"
                        />
                        <div className="note-edit-btns">
                            <button onClick={onSaveNote}>Close</button>
                            <label htmlFor="file-upload">
                                <svg className="img" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#black"><path d="M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM270-290h423.07L561.54-465.38 449.23-319.23l-80-102.31L270-290Zm-70 90v-560 560Z" />
                                </svg>
                            </label>
                            <input className="hide" style={{ display: 'none' }} id="file-upload" onChange={onImgInput} type="file" accept="image/*" />
                            <svg className="pallete" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#black"><path d="M479.23-100q-77.77 0-146.92-29.96-69.16-29.96-120.77-81.58-51.62-51.61-81.58-120.96T100-480q0-79.15 30.77-148.5t83.58-120.65q52.8-51.31 123.54-81.08Q408.62-860 488.77-860q75 0 142.15 25.58 67.16 25.58 117.96 70.81 50.81 45.23 80.96 107.5Q860-593.85 860-521.08q0 103.85-61.73 162.46Q736.54-300 640-300h-72.46q-17.08 0-27.31 11.15Q530-277.69 530-262.46q0 18.54 15 38.54T560-178q0 39.61-21.92 58.81Q516.15-100 479.23-100Zm.77-380Zm-220 30q21.38 0 35.69-14.31Q310-478.62 310-500q0-21.38-14.31-35.69Q281.38-550 260-550q-21.38 0-35.69 14.31Q210-521.38 210-500q0 21.38 14.31 35.69Q238.62-450 260-450Zm120-160q21.38 0 35.69-14.31Q430-638.62 430-660q0-21.38-14.31-35.69Q401.38-710 380-710q-21.38 0-35.69 14.31Q330-681.38 330-660q0 21.38 14.31 35.69Q358.62-610 380-610Zm200 0q21.38 0 35.69-14.31Q630-638.62 630-660q0-21.38-14.31-35.69Q601.38-710 580-710q-21.38 0-35.69 14.31Q530-681.38 530-660q0 21.38 14.31 35.69Q558.62-610 580-610Zm120 160q21.38 0 35.69-14.31Q750-478.62 750-500q0-21.38-14.31-35.69Q721.38-550 700-550q-21.38 0-35.69 14.31Q650-521.38 650-500q0 21.38 14.31 35.69Q678.62-450 700-450ZM479.23-160q9.77 0 15.27-4.81T500-178q0-14-15-31.46t-15-54.69q0-42.77 29-69.31T570-360h70q70.62 0 115.31-41.38Q800-442.77 800-521.08q0-121.38-93.08-200.15Q613.85-800 488.77-800q-137.15 0-232.96 93T160-480q0 133 93.5 226.5T479.23-160Z" /></svg>
                            <svg className="pin" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#black"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z" /></svg>
                            <svg className="check-box" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#black"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" /></svg>
                        </div>
                    </section>
                </form>
            </div >
        </section >
    )
}