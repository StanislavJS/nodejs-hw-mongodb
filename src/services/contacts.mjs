// src/services/contacts.mjs
import { Contact } from "../models/Contact.mjs";
import createHttpError from "http-errors";

// Get all contacts
export const getAll = async ({ userId, page = 1, perPage = 10, sortBy = "createdAt", sortOrder = "asc", filter = {} }) => {
  const pageNum = Math.max(1, Number(page) || 1);
  const limit = Math.max(1, Number(perPage) || 10);
  const skip = (pageNum - 1) * limit;

  const query = { userId };

  if (filter.type) query.contactType = filter.type;
  if (typeof filter.isFavourite !== "undefined") {
    query.isFavourite = filter.isFavourite === true || filter.isFavourite === "true";
  }

  const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

  const [contacts, total] = await Promise.all([
    Contact.find(query).sort(sort).skip(skip).limit(limit),
    Contact.countDocuments(query),
  ]);

  return {
    contacts,
    page: pageNum,
    perPage: limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

// Get contact by ID
export const getById = async (userId, id) => {
  const contact = await Contact.findOne({ _id: id, userId });
  if (!contact) throw createHttpError(404, "Contact not found");
  return contact;
};

// Create new contact
export const create = async (userId, payload) => {
  if (!payload.name || !payload.phoneNumber) {
    throw createHttpError(400, "Missing required fields: name or phoneNumber");
  }
  const contact = await Contact.create({ ...payload, userId });
  return contact;
};

// Update contact
export const update = async (userId, id, payload) => {
  const updated = await Contact.findOneAndUpdate({ _id: id, userId }, payload, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw createHttpError(404, "Contact not found");
  return updated;
};

// Delete contact
export const remove = async (userId, id) => {
  const deleted = await Contact.findOneAndDelete({ _id: id, userId });
  if (!deleted) throw createHttpError(404, "Contact not found");
  return deleted;
};
