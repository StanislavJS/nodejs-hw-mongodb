// src/controllers/contacts.mjs
import { Contact } from "../models/Contact.mjs";
import createHttpError from "http-errors";

// GET /contacts
export const getContacts = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, sortBy = "createdAt", sortOrder = "asc", type, isFavourite } = req.query;

    const pageNum = Math.max(1, Number(page) || 1);
    const limit = Math.max(1, Number(perPage) || 10);
    const skip = (pageNum - 1) * limit;

    const filter = { userId: req.user._id };
    if (type) filter.contactType = type;
    if (typeof isFavourite !== "undefined") filter.isFavourite = isFavourite === "true";

    const [contacts, total] = await Promise.all([
      Contact.find(filter).sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 }).skip(skip).limit(limit),
      Contact.countDocuments(filter),
    ]);

    res.status(200).json({
      contacts,
      page: pageNum,
      perPage: limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

// GET /contacts/:contactId
export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findOne({ _id: contactId, userId: req.user._id });
    if (!contact) throw createHttpError(404, "Contact not found");

    res.status(200).json({ contact });
  } catch (error) {
    next(error);
  }
};

// POST /contacts
export const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create({ ...req.body, userId: req.user._id });
    res.status(201).json({ contact });
  } catch (error) {
    next(error);
  }
};

// PATCH /contacts/:contactId
export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findOneAndUpdate({ _id: contactId, userId: req.user._id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!contact) throw createHttpError(404, "Contact not found");
    res.status(200).json({ contact });
  } catch (error) {
    next(error);
  }
};

// DELETE /contacts/:contactId
export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findOneAndDelete({ _id: contactId, userId: req.user._id });
    if (!contact) throw createHttpError(404, "Contact not found");
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};
