const { useParams, Link,useNavigate } = ReactRouterDOM


import { mailService } from "../services/mail.service.js"
import { MailIndex } from "./MailIndex.jsx"
import { showErrorMsg,showSuccessMsg } from "../services/event-bus.service.js"

const { useEffect, useState } = React

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const [nextMailId, setNextMailId] = useState()
    const [prevMailId, setPrevMailId] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        mailService.get(mailId)
            .then(mail => {
                setMail(mail)

                mailService.getNextMailId(mailId)
                    .then(nextId => setNextMailId(nextId))

                mailService.getPrevMailId(mailId)
                    .then(prevId => setPrevMailId(prevId))
            })
            .catch(err => {
                console.log('Error fetching mail details:', err)
                showErrorMsg('Failed to load mail details')
            })
    },[mailId])

    function onRemoveMail(ev, mailId) {
        ev.stopPropagation()
        ev.preventDefault()
        mailService.remove(mailId)
            .then(() => {
                navigate('/mail')
                setMail(prevMails => mails.filter(mail => mail.id !== mailId))
                showSuccessMsg(`The Mail Removed Succesfuly`)
            })
            .catch(err => {
                console.log(`oops! looks like something went wrong in removing this mail ${mailId}:`, err);
                showErrorMsg('Having trouble removing this mail')
            })
    }

    if (!mail) return <div>Loading ....</div>
    return (
        <section>
            <div className="upper-row flex space-between">
                <div className="symbol-container-left">
                    <Link to="/mail"><span className="material-symbols-outlined arrow-back">arrow_back</span></Link>
                    <span className="material-symbols-outlined archive" title="Archive">archive</span>
                    <span className="material-symbols-outlined report" title ="Report this mail">report</span>
                    <span onClick={(event) => onRemoveMail(event, mail.id)} className="material-symbols-outlined delete" title ="Delete mail">delete</span>
                </div>
                <div className="symbol-container-right">
                    <span className="material-symbols-outlined unread" title ="Unread">mark_email_unread</span>
                    <span className="material-symbols-outlined move-to"title ="Move to">drive_file_move</span>
                </div>
                <div>
                <Link to={`/mail/${prevMailId}`} title ="Previous Mail"><span className="material-symbols-outlined prev-mail">arrow_back_ios</span></Link>
                <Link to={`/mail/${nextMailId}`} title ="Next Mail"><span className="material-symbols-outlined next-mail">arrow_forward_ios</span></Link>
                </div>
            </div>
            <h2>{mail.subject}</h2>
            <h3>{`from:${mail.from}`}</h3>
            <h5>{`to: ${mail.to}`}</h5>
            <h5>{`sent at:  ${mail.sentAt}`}</h5>
            <p>{mail.body}</p>


        </section>
    )
}