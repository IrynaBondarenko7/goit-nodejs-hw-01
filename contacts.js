const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}
async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();

  const contact = {
    name,
    email,
    phone,
    id: crypto.randomUUID(),
  };

  contacts.push(contact);

  await writeContacts(contacts);
  return contact;
}
function removeContact(contactId) {}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
