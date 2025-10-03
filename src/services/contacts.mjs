// src/services/contacts.mjs
import { Contact } from "../models/Contact.mjs";
import createHttpError from "http-errors";

export const getAll = async ({ userId, page = 1, perPage = 10, sortBy = "createdAt", sortOrder = "asc", filter = {} }) => {
  const pageNum = Math.max(1, Number(page) || 1);
  const limit = Math.max(1, Number(perPage) || 10);
  const skip = (pageNum - 1) * limit;

  const query = { userId };

  if (filter.type) query.contactType = filter.type;
  if (typeof filter.isFavourite !== "undefined") {
    query.isFavourite = filter.isFavourite === true || filter.isFavourite === "true";
  }

  const sort = {};
  sort[sortBy] = sortOrder === "desc" ? -1 : 1;

  const [totalItems, data] = await Promise.all([
    Contact.countDocuments(query),
    Contact.find(query).sort(sort).skip(skip).limit(limit),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  return { status: 200, message: "Contacts retrieved successfully", data, page: pageNum, perPage: limit, totalItems, totalPages };
};

export const getById = async (userId, id) => {
  const contact = await Contact.findOne({ _id: id, userId });
  if (!contact) throw createHttpError(404, "Contact not found");
  return { status: 200, message: "Contact retrieved successfully", data: contact };
};

export const create = async (userId, payload) => {
  if (!payload.name || !payload.phoneNumber) {
    throw createHttpError(400, "Missing required fields: name or phoneNumber");
  }
  const contact = await Contact.create({ ...payload, userId });
  return { status: 201, message: "Contact created successfully", data: contact };
};

export const update = async (userId, id, payload) => {
  const updated = await Contact.findOneAndUpdate({ _id: id, userId }, payload, { new: true, runValidators: true });
  if (!updated) throw createHttpError(404, "Contact not found");
  return { status: 200, message: "Contact updated successfully", data: updated };
};

export const remove = async (userId, id) => {
  const deleted = await Contact.findOneAndDelete({ _id: id, userId });
  if (!deleted) throw createHttpError(404, "Contact not found");
  return { status: 200, message: "Contact deleted successfully", data: deleted };
};
