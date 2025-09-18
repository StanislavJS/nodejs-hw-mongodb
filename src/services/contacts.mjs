import createError from 'http-errors';
import { Contact } from '../models/Contact.mjs';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  filter = {}
} = {}) => {
  const pageNum = Math.max(1, Number(page) || 1);
  const limit = Math.max(1, Number(perPage) || 10);
  const skip = (pageNum - 1) * limit;

  const query = {};
  if (filter.type) {
    query.contactType = filter.type;
  }

  if (typeof filter.isFavourite !== 'undefined') {
    if (filter.isFavourite === 'true' || filter.isFavourite === true) {
      query.isFavourite = true;
    } else if (filter.isFavourite === 'false' || filter.isFavourite === false) {
      query.isFavourite = false;
    }
  }

  // build sort object
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  const [totalItems, data] = await Promise.all([
    Contact.countDocuments(query),
    Contact.find(query).sort(sort).skip(skip).limit(limit)
  ]);

  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  return {
    data,
    page: pageNum,
    perPage: limit,
    totalItems,
    totalPages,
    hasPreviousPage: pageNum > 1,
    hasNextPage: pageNum < totalPages
  };
};

export const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  return contact;
};

export const createContact = async (data) => {
  // validation middleware will normally prevent invalid payloads,
  // but keep a defensive check anyway
  if (!data.name || !data.phoneNumber) {
    throw createError(400, 'Missing required fields: name or phoneNumber');
  }

  const newContact = await Contact.create(data);
  return newContact;
};

export const updateContact = async (id, data) => {
  const updated = await Contact.findByIdAndUpdate(id, data, { new: true });
  if (!updated) {
    throw createError(404, 'Contact not found');
  }
  return updated;
};

export const deleteContact = async (id) => {
  const deleted = await Contact.findByIdAndDelete(id);
  if (!deleted) {
    throw createError(404, 'Contact not found');
  }
  return deleted;
};
