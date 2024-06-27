const { Link } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails, onRemoveMail }) {

    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <Link to={`/mail/${mail.id}`} key={mail.id} onRemoveMail={onRemoveMail} >
                    <li key={mail.id}>
                        <MailPreview mail={mail} onRemoveMail={onRemoveMail} />
                    </li>
                </Link>
            )}



        </ul>
    )
}
