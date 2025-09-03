import { Contact } from '../models/Contact.mjs';

export const getAllContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    throw new Error('Failed to fetch contacts: ' + error.message);
  }
};

export const getContactById = async (id) => {
  try {
    return await Contact.findById(id);
  } catch (error) {
    throw new Error('Failed to fetch contact by id: ' + error.message);
  }
};
