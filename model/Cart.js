import mongoose from 'mongoose';

//what i could've done is just directly stored cart array in the userSchema

export const cartSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    min: [1, 'wrong min price'],
    max: [10000, 'wrong max price'],
  },
  discountPercentage: {
    type: Number,
    min: [1, 'wrong min discount'],
    max: [99, 'wrong max discount'],
  },
  rating: {
    type: Number,
    min: [0, 'wrong min rating'],
    max: [5, 'wrong max price'],
    default: 0,
  },
  stock: { type: Number, min: [0, 'wrong min stock'], default: 0 },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  quantity: { type: Number, required: true },
  userId: { type: String, required: true },
  productId: { type: String, required: true },
});

const Cart = mongoose.model('cart', cartSchema);

export default Cart;

// {
//     "title": "Samsung Universe 99",
//     "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
//     "price": 1249,
//     "discountPercentage": 15.46,
//     "rating": 4.09,
//     "stock": 36,
//     "brand": "Samsung",
//     "category": "smartphones",
//     "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//     "images": [
//       "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//       "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//       "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//       "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
//     ],
//     "quantity": 1,
//     "user": 2,
//     "productId": "3",
//     "id": 1
//   },
