const fs = require('fs/promises')
const path = require('path')
const {nanoid} = require('nanoid')
const contactsPath = path.join(__dirname,'db/contacts.json');


async function listContacts() {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
}

async function getContactById(contactId) {
    const data = await listContacts();
    const findId = data.find(contact=>contact.id===contactId)
    return findId||null
}

async function removeContact(contactId) {
    const data = await listContacts();
    const findIndex= data.findIndex((value) => value.id===contactId)
    if(findIndex===-1){
        return
    }
    const [result] = data.splice(findIndex,1)
    await fs.writeFile(contactsPath,JSON.stringify(data,null,2))
    return result || null
}

async function addContact(contact) {
    const data = await listContacts();
    const newItem = {
        id: nanoid(),
       ...contact,
    }
    data.push(newItem);
    await fs.writeFile(contactsPath,JSON.stringify(data,null,2))
    return newItem;
}

module.exports={
    listContacts,
    getContactById,
    removeContact,
    addContact
}