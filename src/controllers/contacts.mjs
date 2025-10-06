// src/controllers/contacts.mjs
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

    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: {
        contacts: result.contacts,
        page: result.page,
        perPage: result.perPage,
        total: result.total,
        totalPages: result.totalPages,
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
    const result = await contactsService.getById(req.user._id, contactId);

    res.status(200).json(result.data);
  } catch (err) {
    next(err);
  }
};

// POST /contacts
export const createContact = async (req, res, next) => {
  try {
    const result = await contactsService.create(req.user._id, req.body);

    res.status(201).json(result.data);
  } catch (err) {
    next(err);
  }
};

// PATCH /contacts/:contactId
export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.update(req.user._id, contactId, req.body);

    res.status(200).json(result.data);
  } catch (err) {
    next(err);
  }
};

// DELETE /contacts/:contactId
export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.remove(req.user._id, contactId);

    res.status(200).json(result.data);
  } catch (err) {
    next(err);
  }
};
