import createError from "http-errors";
import { Contact } from "../models/Contact.mjs";


export const getAllContacts = async (
  ownerId,
  {
    page = 1,
    perPage = 10,
    sortBy = "name",
    sortOrder = "asc",
    filter = {},
  } = {}
) => {
  const pageNum = Math.max(1, Number(page) || 1);
  const limit = Math.max(1, Number(perPage) || 10);
  const skip = (pageNum - 1) * limit;

  const query = { owner: ownerId };

  if (filter.type) {
    query.contactType = filter.type;
  }

  if (typeof filter.isFavourite !== "undefined") {
    query.isFavourite =
      filter.isFavourite === "true" || filter.isFavourite === true;
  }

  // build sort object
  const sort = {};
  sort[sortBy] = sortOrder === "desc" ? -1 : 1;

  const [totalItems, data] = await Promise.all([
    Contact.countDocuments(query),
    Contact.find(query).sort(sort).skip(skip).limit(limit),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  return {
    data,
    page: pageNum,
    perPage: limit,
    totalItems,
    totalPages,
    hasPreviousPage: pageNum > 1,
    hasNextPage: pageNum < totalPages,
  };
};

//id
export const getContactById = async (ownerId, id) => {
  const contact = await Contact.findOne({ _id: id, owner: ownerId });
  if (!contact) {
    throw createError(404, "Contact not found");
  }
  return contact;
};

export const createContact = async (ownerId, data) => {
  if (!data.name || !data.phoneNumber) {
    throw createError(400, "Missing required fields: name or phoneNumber");
  }

  const newContact = await Contact.create({ ...data, owner: ownerId }); // owner
  return newContact;
};

export const updateContact = async (ownerId, id, data) => {
  const updated = await Contact.findOneAndUpdate(
    { _id: id, owner: ownerId },
    data,
    { new: true, runValidators: true }
  );
  if (!updated) {
    throw createError(404, "Contact not found");
  }
  return updated;
};

export const deleteContact = async (ownerId, id) => {
  const deleted = await Contact.findOneAndDelete({ _id: id, owner: ownerId });
  if (!deleted) {
    throw createError(404, "Contact not found");
  }
  return deleted;
};
