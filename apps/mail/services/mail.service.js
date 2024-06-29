
import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const MAIL_KEY = 'mailDB'
const gFilterBy = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki',
    isRead: true,
    isStared: true,
    lables: ['important', 'romantic']
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getNextMailId,
    getPrevMailId,
    getEmptyMail,
    markAsRead,
    markAsUnread,
    markAsStarred,
    markAsUnstarred,

}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            let mailsToDisplay = [...mails]
            if (filterBy.from) {
                const regex = new RegExp(filterBy.from, 'i')
                mailsToDisplay = mails.filter(mail => regex.test(mail.from))
            }
            if (filterBy.subject && !mailsToDisplay.length) {
                const regex = new RegExp(filterBy.subject, 'i')
                mailsToDisplay = mails.filter(mail => regex.test(mail.subject))
            }
            if (filterBy.body && !mailsToDisplay.length) {
                const regex = new RegExp(filterBy.body, 'i')
                mailsToDisplay = mails.filter(mail => regex.test(mail.body))
            }
            if (filterBy.to && !mailsToDisplay.length){
                const regex = new RegExp(filterBy.to, 'i')
                mailsToDisplay = mails.filter(mail => regex.test(mail.to))
            }
            return mailsToDisplay
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getDefaultFilter(filterBy = { subject: '', from: '', to: '', status: '', body: '', isRead: '', isStarred: '', lables: [''] }) {
    return {
        subject: filterBy.subject,
        body: filterBy.body,
        isRead: filterBy.isRead,
        from: filterBy.from,
        to: filterBy.to,
        status: filterBy.status,
        isStarred: filterBy.isStarred,
        labels: filterBy.lables

    }
}

function getEmptyMail(to = '', subject = '', body = '') {

    return {
        from: (`${loggedinUser.fullname}`),
        createdAt: new Date(),
        subject,
        body,
        isRead: false,
        sentAt: new Date(),
        removedAt: null,
        to

    }
}

function getNextMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            let nextMailIdx = mails.findIndex(mail => mail.id === mailId) + 1
            if (nextMailIdx === mails.length) nextMailIdx = 0
            return mails[nextMailIdx].id
        })
}
function getPrevMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            let currentMailIdx = mails.findIndex(mail => mail.id === mailId)
            let prevMailIdx = (currentMailIdx - 1 + mails.length) % mails.length
            return mails[prevMailIdx].id
        })
}

function markAsRead(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            if (mail) {
                mail.isRead = true
                return storageService.put(MAIL_KEY, mail)
            }
        })
}

function markAsUnread(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            if (mail) {
                mail.isRead = false
                return storageService.put(MAIL_KEY, mail)
            }
        })
}

function markAsStarred(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            if (mail) {
                mail.isStarred = true
                console.log('starred from service');
                return storageService.put(MAIL_KEY, mail)
            }
        })
}

function markAsUnstarred(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            if (mail) {
                mail.isStarred = false
                console.log('unstarred from service');

                return storageService.put(MAIL_KEY, mail)
            }
        })
}

function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    const emailAdress = ['momo@momo.com', 'puki@puki.com', 'muki@muki.com', 'Netflix', 'YouTube', 'Amazom Prime']
    const timeStamps = [1719421615, 1719421595, 1687788395000, 1590501995000, 1719410795000, 1719389495000, 1707988295000, 1713287495000, 1719378695000]
    if (!mails || !mails.length) {
        mails = []
        for (let i = 0; i < 10; i++) {
            const mail =
            {
                id: utilService.makeId(),
                createdAt: 1551133930500, // new Date(),
                subject: utilService.makeLorem(2),
                body: utilService.makeLorem(8),
                isRead: false,
                isStarred:false,
                sentAt: timeStamps[utilService.getRandomIntInclusive(0, timeStamps.length - 1)],
                removedAt: null,
                from: emailAdress[utilService.getRandomIntInclusive(0, emailAdress.length - 1)],
                to: 'Omri@appsus.com'
            }
            mails.push(mail)
        }
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}