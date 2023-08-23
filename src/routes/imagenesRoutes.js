import express from "express";
import { uploadImage, getAllImages, deleteImage } from "../controllers/imageController.js";
const router = express.Router();

router.post("/upload", uploadImage);
router.get('/getAll', getAllImages);
router.delete("/delete/:id", deleteImage);

export default router;