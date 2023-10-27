import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  addresses: { type: [Object] },
  img: {type: String },
  role: { type: String, required: true },
});

const User = mongoose.model('user', userSchema);

export default User;
