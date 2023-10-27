import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  checked: { type: Boolean },
});

const Category = mongoose.model('categories', categorySchema);

export default Category;
