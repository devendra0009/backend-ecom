import mongoose from 'mongoose';
import { cartSchema } from './Cart.js';

const orderSchema = new mongoose.Schema({
  cart: [cartSchema], // Embed the cartSchema directly within the order schema
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  addressId: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  userId: { type: String, required: true },
  status: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;

// {
//     "cart": [
//       {
//         "title": "iPhone X",
//         "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
//         "price": 899,
//         "discountPercentage": 17.94,
//         "rating": 4.44,
//         "stock": 34,
//         "brand": "Apple",
//         "category": "smartphones",
//         "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
//         "images": [
//           "https://i.dummyjson.com/data/products/2/1.jpg",
//           "https://i.dummyjson.com/data/products/2/2.jpg",
//           "https://i.dummyjson.com/data/products/2/3.jpg",
//           "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
//         ],
//         "quantity": 1,
//         "user": 1,
//         "productId": 2,
//         "id": 1
//       },
//       {
//         "title": "Samsung Universe 9",
//         "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
//         "price": 1249,
//         "discountPercentage": 15.46,
//         "rating": 4.09,
//         "stock": 36,
//         "brand": "Samsung",
//         "category": "smartphones",
//         "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
//         "images": [
//           "https://i.dummyjson.com/data/products/3/1.jpg"
//         ],
//         "quantity": 5,
//         "user": 1,
//         "productId": 3,
//         "id": 2
//       }
//     ],
//     "name": "dave",
//     "email": "ayush@mail.com",
//     "phone": "34234234",
//     "street": "12",
//     "city": "dfas",
//     "postalCode": "dfsf231",
//     "state": "dsdf",
//     "country": "United States",
//     "addressId": 1696868138121,
//     "paymentMethod": "card",
//     "totalAmount": 6017,
//     "totalItems": 6,
//     "userId": 1,
//     "status": "accepted",
//     "id": 1696868200426
//   },
