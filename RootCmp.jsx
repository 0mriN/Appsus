const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
import { MailDetails } from "./apps/mail/pages/MailDetails.jsx"
import { MailAdd } from "./apps/mail/pages/MailAdd.jsx"
import { Accordion } from "./apps/note/cmps/Accordion.jsx"
import { NoteEdit } from "./apps/note/cmps/NoteEdit.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/:mailId" element={<MailDetails />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/note/edit/:noteId" element={<NoteEdit />} />
                <Route path="/mail/add" element={<MailAdd />} />
            </Routes>
        </section>
    </Router>
}
