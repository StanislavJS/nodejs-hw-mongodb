import * as contactsService from "../services/contacts.mjs";
import { ctrlWrapper } from "../utils/ctrlWrapper.mjs";

export const getContacts = ctrlWrapper(async (req, res) => {
  const contacts = await contactsService.getAllContacts();
  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
});

export const getContactById = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
});

export const createContact = ctrlWrapper(async (req, res) => {
  const newContact = await contactsService.createContact(req.body);
  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: newContact,
  });
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;
  const updated = await contactsService.updateContact(contactId, req.body);
  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: updated,
  });
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;
  await contactsService.deleteContact(contactId);
  res.status(204).send();
});
