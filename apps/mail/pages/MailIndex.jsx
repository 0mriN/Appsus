const { Link } = ReactRouterDOM

import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js";
import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { mailService } from "../services/mail.service.js";

const { useEffect, useState } = React

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [sortBy, setSortBy] = useState({ field: 'sentAt', order: 'desc' })


    useEffect(() => {
        loadMails()
    }, [filterBy, sortBy])

    function loadMails() {
        mailService.query(filterBy, sortBy)
            .then(mails => {
                setMails(mails)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onSortBy(sortOption) {

        let newSortBy = { ...sortBy }

        if (sortOption === 'date') {
            if (sortBy.field === 'sentAt') {
                newSortBy = { field: 'sentAt', order: sortBy.order === 'asc' ? 'desc' : 'asc' }
            } else {
                newSortBy = { field: 'sentAt', order: 'desc' }
            }
        } else if (sortOption === 'starred') {
            newSortBy = { field: 'isStarred', order: 'desc' }
        } else if (sortOption === 'read') {
            newSortBy = { field: 'isRead', order: 'asc' }
        } else if (sortOption === 'unread') {
            newSortBy = { field: 'isRead', order: 'desc' }
        }

        setSortBy(newSortBy);
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

    function onMarkAsStarred(mailId) {
        mailService.markAsStarred(mailId)
            .then(() => {
                setMails(prevMails =>
                    prevMails.map(mail =>
                        mail.id === mailId ? { ...mail, isStarred: true } : mail
                    )
                )
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onMarkAsUnstarred(mailId) {
        mailService.markAsUnstarred(mailId)
            .then(() => {
                setMails(prevMails =>
                    prevMails.map(mail =>
                        mail.id === mailId ? { ...mail, isStarred: false } : mail
                    )
                )
            })
            .catch(err => {
                console.error('Error marking mail as unstarred:', err)
            })
    }


    if (!mails) return <div>Loading...</div>
    return (
        <section>
            <header className="mail-header">
                <img src="./assets/img/c-gmail-logo.png"></img>
                <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} className="mail-search" />
            </header>

            <div className="sort-controls-container">
                <div className="mail-sort-controls">
                    <label htmlFor="sortSelect">Sort by</label>
                    <select className="sort-bar" id="sortSelect" value={`${sortBy.field}:${sortBy.order}`} onChange={(ev) => {
                        const [field, order] = ev.target.value.split(':');
                        setSortBy({ field, order })
                    }}>
                        <option value="sentAt:desc">Date (Newest first)</option>
                        <option value="isStarred:desc">Starred</option>
                        <option value="isRead:asc">Read</option>
                        <option value="isRead:desc">Unread</option>
                    </select>
                </div>
            </div>

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
                        onMarkAsStarred={onMarkAsStarred}
                        onMarkAsUnstarred={onMarkAsUnstarred}
                    />
                </div>
            </section>
        </section>
    )
}

