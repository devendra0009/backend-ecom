import express  from "express";
import { addToCart, clearCartByUserId, deleteFromCartById, fetchCartByUserId, updateCartById } from "../controllers/Cart.js";
const router = express.Router();

router.get('/',fetchCartByUserId);
// router.get('/:id',fetchCartById);
router.post('/',addToCart);
router.patch('/:id',updateCartById);
router.delete('/deleteOne/:id',deleteFromCartById);
router.delete('/clearCart/',clearCartByUserId);

export default router;