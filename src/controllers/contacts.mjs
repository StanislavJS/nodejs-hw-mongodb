import createError from 'http-errors';
import * as contactsService from '../services/contacts.mjs';

export const getContacts = async (req, res, next) => {
  try {
    const { page, perPage, sortBy, sortOrder, type, isFavourite } = req.query;

    const result = await contactsService.getAllContacts({
      page,
      perPage,
      sortBy: sortBy || 'name',
      sortOrder: sortOrder || 'asc',
      filter: {
        type,
        isFavourite
      }
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsService.getContactById(contactId);
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact
    });
  } catch (err) {
    next(err);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const newContact = await contactsService.createContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact
    });
  } catch (err) {
    next(err);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updated = await contactsService.updateContact(contactId, req.body);
    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await contactsService.deleteContact(contactId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
