const fs = require("fs").promises;
const path = require("path")

const { v4: uuidv4 } = require("uuid")

const contactsPath = path.join(__dirname, "db/contacts.json")

const listContacts = async () => {
    const contacts = await fs.readFile(contactsPath, "utf-8")
    return JSON.parse(contacts)
}

const updateContacts = async (contacts) =>
    await fs.writeFile(contactsPath, JSON.stringify(contacts))

const getContactById = async (contactId) => {
    const contacts = await listContacts()
    const contact = contacts.find(el => el.id === contactId)
    return contact || null
}

const addContact = async (name, email, phone) => {
    const contacts = await listContacts()
    const newContact = {
        id: uuidv4(), name, email, phone,
    }
    contacts.push(newContact)
    await updateContacts(contacts)
    return newContact
}

const removeContact = async (contactId) => {
    const contacts = await listContacts()
    const index = contacts.findIndex(el => el.id === contactId)
    if (index === -1) {
        return null
    }
    const [deletedContact] = contacts.splice(index, 1)
    await updateContacts(contacts)
    return deletedContact
}


module.exports = {
    listContacts, getContactById, addContact, removeContact
}