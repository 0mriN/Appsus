const {Link} = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails,onRemoveMail ,onSelectMail: onSelectMailId}) {


    return (
        <ul className="mail-list">
        {mails.map(mail=>
        //   <Link to={`/mails/${mail.id}`} key={mail.id}>
            <li onClick={()=>onSelectMailId(mail.id)} key={mail.id}>
                <MailPreview mail={mail} onRemoveMail={onRemoveMail}  />
                 </li>
                //  </Link> 
        )}



        </ul>
    )
}
