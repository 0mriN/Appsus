import { mailService } from "../services/mail.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js";
const { useNavigate, Link } = ReactRouterDOM
const { useState } = React
// const { Link } = ReactRouterDOM


export function MailAdd() {
    const [addMail, setAddMail] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()

    function onSaveMail(ev) {
        ev.preventDefault()
        mailService.save(addMail)
            .then(() => {
                showSuccessMsg('Mail Sent Successfully!')
                navigate('/mail')
            })
            .catch(err => {
                console.log(`oops! looks like something went wrong in sending this mail ${mailId}:`, err);
                showErrorMsg('Having trouble sending this mail')
            })

    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setAddMail(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { to, subject, body } = addMail

    return (
        <section className="mail-add">
            <Link to="/mail"><span className="material-symbols-outlined arrow-back" title="Back">arrow_back</span></Link>
            <h1>New Mail</h1>
            <div className="form">

                <form onSubmit={onSaveMail}>
                    <label htmlFor="to">To</label>
                    <input onChange={handleChange} value={to} type="text" name="to" id="to" />

                    <label htmlFor="subject">Subject</label>
                    <input onChange={handleChange} value={subject} type="text" name="subject" id="subject" />
                    <textarea onChange={handleChange} value={body} name="body"
                        id="body" rows={10} style={{ height: "15rem" }}>

                    </textarea>
                    <button>Send</button>

                </form>
            </div>



        </section>
    )
}