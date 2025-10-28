import Contact from "../models/contact.js";

// GET all
export const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

// POST new
export const createContact = async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json(contact);
};

// DELETE by id
export const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact deleted" });
};
