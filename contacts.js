const path = require("path");
const fs = require("fs").promises;


async function readContacts() {
    const contactsPath = path.resolve('./bd', 'contacts.json')
    const contacts = await fs.readFile(contactsPath)
        .then(data => {
            return JSON.parse(data.toString())
        })
        .catch(err => console.log(err.message))

    return contacts
}

async function listContacts() {
    const contacts = await readContacts()

    const contactsList = contacts.map(contact => contact.name)
    console.table(contactsList)
    return contactsList
}

async function getContactById(contactId) {
    const contacts = await readContacts()

    const targetContact = contacts.find(contact => contact.id === contactId)
    console.dir(targetContact)
    return targetContact
}

async function addContact(name, email, phone) {
    const contacts = await readContacts()

    const newId = String(Math.round((Math.random() * 100) * (Math.random() * 100)))
    const newContact = { id: newId, name, email, phone }
    contacts.push(newContact)

    fs.writeFile(contactsPath, JSON.stringify(contacts))
}

async function removeContact(contactId) {
    const contacts = await readContacts()

    const contactIndex = contacts.findIndex(contact => contact.id === contactId)
    contacts.splice(contactIndex, 1)

    fs.writeFile(contactsPath, JSON.stringify(contacts))
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}