import express  from "express";
import { createBrand, deleteAllBrands, deleteBrandById, fetchAllBrands, fetchBrandById, updateBrandById } from "../controllers/Brand.js";
const router = express.Router();

router.get('/',fetchAllBrands);
router.get('/:id',fetchBrandById);
router.post('/',createBrand);
router.patch('/:id',updateBrandById);
router.delete('/:id',deleteBrandById);
router.delete('/',deleteAllBrands);

export default router;