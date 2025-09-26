import { Contact } from "../models/Contact.mjs";
import createHttpError from "http-errors";

// GET /contacts
export const getContacts = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, sortBy = "createdAt", sortOrder = "asc", type, isFavourite } = req.query;

    const filter = { owner: req.user._id };
    if (type) filter.contactType = type;
    if (isFavourite !== undefined) filter.isFavourite = isFavourite === "true";

    const skip = (parseInt(page) - 1) * parseInt(perPage);
    const contacts = await Contact.find(filter)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(parseInt(perPage));

    const total = await Contact.countDocuments(filter);

    res.status(200).json({
      status: "success",
      code: 200,
      data: { contacts, total, page: parseInt(page), perPage: parseInt(perPage) },
    });
  } catch (error) {
    next(error);
  }
};

// GET /contacts/:contactId
export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findOne({ _id: contactId, owner: req.user._id });
    if (!contact) throw createHttpError(404, "Contact not found");

    res.status(200).json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
};

// POST /contacts
export const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create({ ...req.body, owner: req.user._id });

    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /contacts/:contactId
export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!contact) throw createHttpError(404, "Contact not found");

    res.status(200).json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /contacts/:contactId
export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findOneAndDelete({ _id: contactId, owner: req.user._id });
    if (!contact) throw createHttpError(404, "Contact not found");

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
};
