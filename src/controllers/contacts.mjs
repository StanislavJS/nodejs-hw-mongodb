import * as contactsService from "../services/contacts.mjs";
import createHttpError from "http-errors";

// GET /contacts
export const getContacts = async (req, res, next) => {
  try {
    const { page, perPage, sortBy, sortOrder, type, isFavourite } = req.query;

    const result = await contactsService.getAll({
      userId: req.user._id,
      page,
      perPage,
      sortBy: sortBy || "name",
      sortOrder: sortOrder || "asc",
      filter: { type, isFavourite },
    });

    const { contacts, ...meta } = result;

    res.status(200).json({
  status: 200,
  message: "Successfully found contacts!",
  data: contacts,
  meta: {
    page: meta.page,
    perPage: meta.perPage,
    totalItems: meta.total,
    totalPages: meta.totalPages,
    hasPreviousPage: meta.hasPreviousPage ?? meta.page > 1,
    hasNextPage: meta.hasNextPage ?? meta.page < meta.totalPages,
  },
    });
  } catch (err) {
    next(err);
  }
};

// GET /contacts/:contactId
export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsService.getById(req.user._id, contactId);

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

// POST /contacts
export const createContact = async (req, res, next) => {
  try {
    const contact = await contactsService.create(req.user._id, req.body);

    res.status(201).json({
      status: 201,
      message: "Successfully created a contact!",
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /contacts/:contactId
export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsService.update(req.user._id, contactId, req.body);

    res.status(200).json({
      status: 200,
      message: "Successfully patched a contact!",
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /contacts/:contactId
export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await contactsService.remove(req.user._id, contactId);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
