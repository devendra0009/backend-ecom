import express  from "express";
import { createCategory, deleteAllCategories, deleteCategoryById, fetchAllCategories, fetchCategoryById, updateCategoryById } from "../controllers/Category.js";
const router = express.Router();

router.get('/',fetchAllCategories);
router.get('/:id',fetchCategoryById);
router.post('/',createCategory);
router.patch('/:id',updateCategoryById);
router.delete('/:id',deleteCategoryById);
router.delete('/',deleteAllCategories);

export default router;