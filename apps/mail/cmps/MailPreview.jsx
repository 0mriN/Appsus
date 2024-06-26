export function MailPreview({ mail }) {

// const date = new Date

    return (
        <section className="mail-preview ">
            <input type="checkbox" name="select" id={mail.id} />
            <span className="material-symbols-outlined">grade</span>
            <span className="material-symbols-outlined">label_important</span>
            <h3>{mail.from}</h3>
            <h3 className="subject">{mail.subject}</h3>
            <p className="space-between body">{mail.body}</p>
            <span class="material-symbols-outlined archive right-symbols">archive</span>
            <span class="material-symbols-outlined delete right-symbols">delete</span>
            <span class="material-symbols-outlined unread right-symbols">mark_email_unread</span>
            {/* <span class="material-symbols-outlined read right-symbols">mark_email_read</span> */}
            <span class="material-symbols-outlined schedule right-symbols">schedule</span>
            <p className="date">{new Date(mail.sentAt).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric' })}</p>

        </section>
    )
}