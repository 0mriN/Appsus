const { Link } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails, onRemoveMail,onMarkAsRead,onMarkAsUnread }) {

    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <Link to={`/mail/${mail.id}`} key={mail.id} onRemoveMail={onRemoveMail} >
                    <li key={mail.id}>
                        <MailPreview
                         mail={mail} 
                         onRemoveMail={onRemoveMail} 
                         onMarkAsRead={()=> onMarkAsRead(mail.id)}
                         onMarkAsUnread={()=> onMarkAsUnread(mail.id)}
                         />
                    </li>
                </Link>
            )}



        </ul>
    )
}
