import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  checked: { type: Boolean },
});

const Brand = mongoose.model('brand', brandSchema);

export default Brand;
