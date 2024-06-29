const { Link } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails, onRemoveMail, onMarkAsRead, onMarkAsUnread, onMarkAsStarred, onMarkAsUnstarred }) {

    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <Link to={`/mail/${mail.id}`} key={mail.id} onRemoveMail={onRemoveMail} >
                    <li key={mail.id}>
                        <MailPreview
                            mail={mail}
                            onRemoveMail={onRemoveMail}
                            onMarkAsRead={() => onMarkAsRead(mail.id)}
                            onMarkAsUnread={() => onMarkAsUnread(mail.id)}
                            onMarkAsStarred={() => onMarkAsStarred(mail.id)}
                            onMarkAsUnstarred={() => onMarkAsUnstarred(mail.id)}
                        />
                    </li>
                </Link>
            )}



        </ul>
    )
}
