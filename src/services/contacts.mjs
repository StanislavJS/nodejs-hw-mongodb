import createError from "http-errors";
import { Contact } from "../models/Contact.mjs";

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw createError(404, "Contact not found");
  }
  return contact;
};

export const createContact = async (data) => {
  if (!data.name || !data.phoneNumber || !data.contactType) {
    throw createError(400, "Missing required fields");
  }
  const newContact = await Contact.create(data);
  return newContact;
};

export const updateContact = async (id, data) => {
  const updated = await Contact.findByIdAndUpdate(id, data, { new: true });
  if (!updated) {
    throw createError(404, "Contact not found");
  }
  return updated;
};

export const deleteContact = async (id) => {
  const deleted = await Contact.findByIdAndDelete(id);
  if (!deleted) {
    throw createError(404, "Contact not found");
  }
  return deleted;
};
