import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const NOTE_KEY = 'noteDB'
_CreateNotes()

export const noteService = {
    query,
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            console.log('notes:', notes)
            return notes
        })
}

function _CreateNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        notes.push(_CreateNoteTxt())
        notes.push(_CreateNoteTxt())
        notes.push(_CreateNoteTxt())
        notes.push(_CreateNoteImg())
        notes.push(_CreateNoteImg())
        notes.push(_CreateNoteImg())
        notes.push(_CreateNoteTodos())
        notes.push(_CreateNoteTodos())
        notes.push(_CreateNoteTodos())
        storageService.saveToStorage(NOTE_KEY, notes)
    }
}

function _CreateNoteTodos() {
    return {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTodos',
        isPinned: false,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            title: utilService.makeLorem(4),
            todos: [
                { txt: 'Driving license', doneAt: null, todoId: utilService.makeId() },
                { txt: 'Coding power', doneAt: 187111111, todoId: utilService.makeId() }
            ]
        }
    }
}

function _CreateNoteImg() {
    return {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteImg',
        isPinned: false,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            title: utilService.makeLorem(4),
            txt: utilService.makeLorem(10),
            url: '/assets/img/honda.jpg',
        }
    }
}

function _CreateNoteTxt() {
    return {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            title: utilService.makeLorem(4),
            txt: utilService.makeLorem(10),
        }
    }
}