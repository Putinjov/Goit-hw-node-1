const {program} = require("commander")
const contacts = require('./contacts')


async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const list = await contacts.listContacts()
            return console.table(list)
            break;

        case "get":
            const get = await contacts.getContactById(id);
            return console.log(get)
            break;

        case "add":
            const newItem = await contacts.addContact({name, email, phone});
            return console.log(newItem)
            break;

        case "remove":
            const deleteItem = await contacts.removeContact(id);
            return console.log(deleteItem)
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

program
    .option("--action, <type>")
    .option("--id, <type>")
    .option("--name, <type>")
    .option("--email, <type>")
    .option("--phone, <type>");

program.parse()

const options = program.opts();
invokeAction(options)