import { LongTxt } from "../../../cmps/LongTxt.jsx"

export function MailPreview({ mail, onRemoveMail, onMarkAsRead, onMarkAsUnread, onMarkAsStarred, onMarkAsUnstarred }) {
    let date

    getDate(mail.sentAt)

    function getDate(sentAt) {
        let currDate = Date.now()
        let sentDate = sentAt
        const dayTime = 1000 * 60 * 60 * 24

        if (currDate - sentDate < dayTime) return date = new Date(mail.sentAt).toLocaleString([], { hour: 'numeric', minute: 'numeric' })
        if (currDate - sentDate < dayTime * 365) return date = new Date(mail.sentAt).toLocaleString([], { month: 'long', day: 'numeric' })
        else return date = new Date(mail.sentAt).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric' })
    }

    const readClass = mail.isRead ? 'read-mail' : 'unread-mail'

    return (
        <section className={`mail-preview space-between ${readClass}`} onClick={onMarkAsRead}>
            <span className="material-symbols-outlined checkbox" title="Select">check_box_outline_blank</span>
            {/* <span class="material-symbols-outlined" title="Selected">check_box</span> */}
            {!mail.isStarred ? (
                <span className="material-symbols-outlined star" title="Star"
                    onClick={(ev) => {
                        ev.stopPropagation()
                        ev.preventDefault()
                        onMarkAsStarred()
                    }}>
                    grade</span>
            ) : (
                <span className="material-symbols-outlined unstar" title="unStar"
                    onClick={(ev) => {
                        ev.stopPropagation()
                        ev.preventDefault()
                        onMarkAsUnstarred()
                    }}>
                    grade</span>
            )}
            <span className="material-symbols-outlined important" title="Important">label_important</span>
            <h3>{mail.from}</h3>
            <h3 className="subject">{`${mail.subject}`}</h3>
            <LongTxt txt={mail.body} />
            <span className="material-symbols-outlined archive right-symbols" title="Archive">archive</span>
            <span onClick={(event) => onRemoveMail(event, mail.id)} className="material-symbols-outlined delete right-symbols" title="Delete">delete</span>
            {mail.isRead ? (
                <span className="material-symbols-outlined unread right-symbols" title="Mark as unread"
                    onClick={(ev) => {
                        ev.stopPropagation()
                        ev.preventDefault()
                        onMarkAsUnread()
                    }}>
                    mark_email_unread</span>
            ) : (
                <span className="material-symbols-outlined read right-symbols" title="Mark as read"
                    onClick={(ev) => {
                        ev.stopPropagation()
                        ev.preventDefault()
                        onMarkAsRead()
                    }}>
                    mark_email_read</span>
            )}
            <span className="material-symbols-outlined schedule right-symbols" title="Snooze (under development)">schedule</span>
            <p className="date">{date}</p>
        </section>
    )
}

