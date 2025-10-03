// src/controllers/contacts.mjs
import * as contactsService from "../services/contacts.mjs";
import createHttpError from "http-errors";

// GET /contacts
export const getContacts = async (req, res, next) => {
  try {
    const { page, perPage, sortBy, sortOrder, type, isFavourite } = req.query;
    const filter = { type, isFavourite };
    const result = await contactsService.getAll({
      userId: req.user._id,
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });

    res.status(200).json({
      status: "success",
      message: "Contacts retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// GET /contacts/:contactId
export const getContactById = async (req, res, next) => {
  try {
    const contact = await contactsService.getById(req.user._id, req.params.contactId);
    res.status(200).json({
      status: "success",
      message: "Contact retrieved successfully",
      data: { contact },
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
      status: "success",
      message: "Contact created successfully",
      data: { contact },
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /contacts/:contactId
export const updateContact = async (req, res, next) => {
  try {
    const contact = await contactsService.update(req.user._id, req.params.contactId, req.body);
    res.status(200).json({
      status: "success",
      message: "Contact updated successfully",
      data: { contact },
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /contacts/:contactId
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await contactsService.remove(req.user._id, req.params.contactId);
    res.status(200).json({
      status: "success",
      message: "Contact deleted successfully",
      data: { contact },
    });
  } catch (err) {
    next(err);
  }
};
