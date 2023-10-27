import express  from "express";
import { createOrder, deleteOrderById, fetchAllOrders, fetchOrdersById, fetchOrdersByUserId, updateOrderById } from "../controllers/Order.js";
const router = express.Router();

router.get('/',fetchAllOrders);
router.get('/user',fetchOrdersByUserId);
router.get('/order',fetchOrdersById);
router.post('/',createOrder);
router.patch('/',updateOrderById); // means updating status accepted , deleted and all
router.delete('/',deleteOrderById);
// router.delete('/clearCart/:id',clearCartByUserId);

export default router;