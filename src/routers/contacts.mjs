import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.mjs';
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} from '../controllers/contacts.mjs';

import { validateBody } from '../utils/validateBody.mjs';
import { createContactSchema, updateContactSchema } from '../validation/contactsSchemas.mjs';
import { isValidId } from '../middlewares/isValidId.mjs';

const router = express.Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', isValidId, ctrlWrapper(getContactById));
router.post('/', validateBody(createContactSchema), ctrlWrapper(createContact));
router.patch('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(updateContact));
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContact));

export default router;
