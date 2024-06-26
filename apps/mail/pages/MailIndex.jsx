import { MailList } from "../cmps/MailList.jsx";
import { mailService } from "../services/mail.service.js";
import { MailDetails } from "./MailDetails.jsx";

const { useEffect, useState } = React

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getEmptyMail())
    const [selectedMailId, setSelectedMailId] = useState(null)



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

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => setMails(prevMails => mails.filter(mail => mail.id !== mailId)))
            .catch(err => {
                console.log(`oops! looks like something went wrong in removing this book ${bookId}:`, err);
            })
    }

function onSelectMailId(mail){
    setSelectedMailId(mail)
}

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            {!selectedMailId ?
                <React.Fragment>
                    <MailList
                     mails={mails}
                     onRemoveMail={onRemoveMail}
                     onSelectMailId={onSelectMailId} 
                     />
                </React.Fragment>
                : <MailDetails />
            }
        </section>
    )
}

