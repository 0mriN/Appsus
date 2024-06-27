const { Link } = ReactRouterDOM

import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { mailService } from "../services/mail.service.js";

const { useEffect, useState } = React

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())


    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails.sort((a, b) => b.sentAt - a.sentAt))
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveMail(ev, mailId) {
        ev.stopPropagation()
        ev.preventDefault()
        mailService.remove(mailId)
            .then(() => setMails(prevMails => mails.filter(mail => mail.id !== mailId)))
            .catch(err => {
                console.log(`oops! looks like something went wrong in removing this mail ${mailId}:`, err);
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }


    if (!mails) return <div>Loading...</div>
    return (
        <section>
            <header className="mail-header">
                <img src="./assets/img/c-gmail-logo.png"></img>
                <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} className="mail-search" />

            </header>
            <section className="mail-index">
                <div className="mail-options">
                    <Link to="/mail/add" >
                        <button className="mail-add-btn">
                            Compose
                        </button>
                    </Link>
                </div>
                <MailList
                    mails={mails}
                    onRemoveMail={onRemoveMail} />
                <div className="nav-symbols">
                    <span class="material-symbols-outlined calendar">calendar_month</span>
                    <span class="material-symbols-outlined notes">batch_prediction</span>
                    <span class="material-symbols-outlined task">task_alt</span>
                    <span class="material-symbols-outlined contact">contacts_product</span>
                </div>
            </section>
        </section>
    )
}

