// src/routers/contacts.mjs
import { Router } from "express";
import * as contactsController from "../controllers/contacts.mjs";
import { authenticate } from "../middlewares/authenticate.mjs";

const router = Router();

router.use(authenticate);

router.get("/", contactsController.getContacts);
router.get("/:contactId", contactsController.getContactById);
router.post("/", contactsController.createContact);
router.patch("/:contactId", contactsController.updateContact);
router.delete("/:contactId", contactsController.deleteContact);

export default router;
