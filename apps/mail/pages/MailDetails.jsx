const { useParams, Link } = ReactRouterDOM


import { mailService } from "../services/mail.service.js"
import { MailIndex } from "./MailIndex.jsx"

const { useEffect, useState } = React

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const { mailId } = useParams()

    useEffect(() => {
        mailService.get(mailId)
            .then(mail => {
                setMail(mail)

            })
    })

    if (!mail) return <div>Loading ....</div>
    return (
        <section>
            <div className="upper-row flex space-between">
                <div className="symbol-container-left">
                    <Link to="/mail"><span className="material-symbols-outlined arrow-back">arrow_back</span></Link>
                    <span className="material-symbols-outlined archive">archive</span>
                    <span className="material-symbols-outlined report">report</span>
                    <span onClick={(event) => onRemoveMail(event, mail.id)} className="material-symbols-outlined delete">delete</span>
                </div>
                <div className="symbol-container-right">
                    <span className="material-symbols-outlined unread">mark_email_unread</span>
                    <span className="material-symbols-outlined move-to">drive_file_move</span>
                </div>
                <div>
                    <span className="material-symbols-outlined prev-mail">arrow_back_ios</span>
                    <span className="material-symbols-outlined next-mail">arrow_forward_ios</span>
                </div>
            </div>
            <h2>{mail.subject}</h2>

        </section>
    )
}