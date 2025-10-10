// src/routers/contacts.mjs
import { Router } from "express";
import * as contactsController from "../controllers/contacts.mjs";
import { authenticate } from "../middlewares/authenticate.mjs";
import { upload } from "../utils/cloudinary.mjs"; // ✅ додаємо імпорт multer cloudinary storage

const router = Router();

router.use(authenticate);

router.get("/", contactsController.getContacts);
router.get("/:contactId", contactsController.getContactById);

// ✅ тепер підтримує завантаження фото
router.post("/", upload.single("photo"), contactsController.createContact);

// ✅ оновлення контакту також може змінювати фото
router.patch("/:contactId", upload.single("photo"), contactsController.updateContact);

router.delete("/:contactId", contactsController.deleteContact);

export default router;
