const { Link } = ReactRouterDOM

import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js";
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
            .then(() => {
                setMails(prevMails => mails.filter(mail => mail.id !== mailId))
                showSuccessMsg(`The Mail Removed Succesfuly`)
            })
            .catch(err => {
                console.log(`oops! looks like something went wrong in removing this mail ${mailId}:`, err);
                showErrorMsg('Having trouble removing this mail')
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }

    function onMarkAsRead(mailId) {
        mailService.markAsRead(mailId)
            .then(() => {
                setMails(prevMails =>
                    prevMails.map(mail =>
                        mail.id === mailId ? { ...mail, isRead: true } : mail
                    )
                )
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onMarkAsUnread(mailId) {
        mailService.markAsUnread(mailId)
            .then(() => {
                setMails(prevMails =>
                    prevMails.map(mail =>
                        mail.id === mailId ? { ...mail, isRead: false } : mail
                    )
                )
            })
            .catch(err => {
                console.error('Error marking mail as unread:', err)
            })
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
                            <span className="material-symbols-outlined">edit</span>
                            Compose
                        </button>
                    </Link>
                    <div className="nav-options">
                        <p>
                            <span className="material-symbols-outlined">inbox</span>
                            Inbox
                        </p>
                        <p>
                            <span className="material-symbols-outlined">grade</span>
                            Starred
                        </p>
                        <p>
                            <span className="material-symbols-outlined">label_important</span>
                            Important
                        </p>
                        <p>
                            <span className="material-symbols-outlined">send</span>
                            Sent
                        </p>
                        <p>
                            <span className="material-symbols-outlined">draft</span>
                            Drafts
                        </p>
                    </div>
                </div>
                <div className="mail-list-container">
                    <MailList
                        mails={mails}
                        onRemoveMail={onRemoveMail} 
                        onMarkAsRead={onMarkAsRead}
                        onMarkAsUnread={onMarkAsUnread}
                        />
                </div>
                {/* <div className="nav-symbols">
                    <span className="material-symbols-outlined calendar">calendar_month</span>
                    <span className="material-symbols-outlined notes">batch_prediction</span>
                    <span className="material-symbols-outlined task">task_alt</span>
                    <span className="material-symbols-outlined contact">contacts_product</span>
                </div> */}
            </section>
        </section>
    )
}

