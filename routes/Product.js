import express from 'express';
import {
  createProduct,
  deleteAllProducts,
  deleteProductById,
  fetchAllProducts,
  fetchProductById,
  updateProductById,
} from '../controllers/Product.js';
import singleUpload from '../middleware/multer.js';

const router = express.Router();

router.post('/', singleUpload, createProduct);
router.get('/', fetchAllProducts);
router.get('/:id', fetchProductById);
router.patch('/:id',singleUpload, updateProductById);
router.delete('/:id', deleteProductById);
router.delete('/', deleteAllProducts);

export default router;
