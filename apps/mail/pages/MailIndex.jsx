import { MailList } from "../cmps/MailList.jsx";
import { mailService } from "../services/mail.service.js";


const { useEffect, useState } = React

export function MailIndex() {

    const [mails, setMails] = useState(null)

    useEffect(() => {
        mailService.query()
            .then(mails => setMails(mails))
            .catch(err => {
                console.log('err:', err)
            },[])
    })
if(!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
        <div>mail app</div>
            <MailList mails={mails} />


        </section>
    )
}

