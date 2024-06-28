import { LongTxt } from "../../../cmps/LongTxt.jsx"

export function MailPreview({ mail, onRemoveMail }) {
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


    return (
        <section className="mail-preview space-between">
            <span className="material-symbols-outlined checkbox">check_box_outline_blank</span>
            {/* <span class="material-symbols-outlined">check_box</span> */}
            <span className="material-symbols-outlined star">grade</span>
            <span className="material-symbols-outlined important">label_important</span>
            <h3>{mail.from}</h3>
            <h3 className="subject">{`${mail.subject}`}</h3>
            <LongTxt txt ={mail.body} />
            {/* <p className="subject">{mail.body}</p> */}
            <span className="material-symbols-outlined archive right-symbols">archive</span>
            <span onClick={(event) => onRemoveMail(event, mail.id)} className="material-symbols-outlined delete right-symbols">delete</span>
            <span className="material-symbols-outlined unread right-symbols">mark_email_unread</span>
            {/* <span className="material-symbols-outlined read right-symbols">mark_email_read</span> */}
            <span className="material-symbols-outlined schedule right-symbols">schedule</span>
            <p className="date">{date}</p>
        </section>
    )
}

