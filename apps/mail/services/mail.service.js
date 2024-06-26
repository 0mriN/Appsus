
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
    getEmptyMail,
    // getFilterBy,
    // setFilterBy,

}

function query(gFilterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (gFilterBy.status) {
                const regex = new RegExp(gFilterBy.status, 'i')
                mails = mails.filter(mail => regex.test(mail.status))
            }
            // if (gFilterBy.isRead) {
            //     mails = mails.filter(mail => mail.listPrice.amount >= gFilterBy.price)
            // }
            return mails
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

function getEmptyMail(id = '', subject = '', body = '') {
    return {
        id,
        createdAt: 1551133930500, // new Date(),
        subject: utilService.makeLorem(2),
        body: utilService.makeLorem(6),
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.co'
    }
}

function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || mails.length) {
        mails = []
        for (let i = 0; i < 10; i++) {
            const mail =
            {
                id: utilService.makeId(),
                createdAt: 1551133930500, // new Date(),
                subject: utilService.makeLorem(2),
                body: utilService.makeLorem(6),
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.co'
            }
            mails.push(mail)
        }
        // console.log('mails:', mails);
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}