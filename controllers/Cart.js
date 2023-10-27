import Cart from '../model/Cart.js';

export const fetchCartByUserId = async (req, res) => {
  try {
    console.log(req.user,"fetchcartbyid");
    const { id } = req.user;
    // console.log(id);
    const data = await Cart.find({ userId: id });
    // console.log(data);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const {id}=req.user;
    const cartItem = req.body;
    const { productId } = cartItem;
    const existingCart = await Cart.findOne({
      userId: id,
      productId: productId,
    });
    if (existingCart) {
      res.status(403).json({ msg: 'Cart Already Exists' });
    } else {
      // console.log(cartItem, 'citem');
      const data = new Cart({...cartItem,userId:id});
      // delete cartItem._id;
      // cartItem._id = Math.round(Date.now() + Math.random());
      // console.log(data);
      const response = await data.save();
      // console.log(response, 'res');
      res.status(200).json({ data: response });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateCartById = async (req, res) => {
  try {
    const updatedCartData = req.body;
    const { id } = req.params; // pass cart's id
    // console.log(updatedCartData, id);
    const data = await Cart.findByIdAndUpdate(id, updatedCartData, {
      new: true,
    });
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteFromCartById = async (req, res) => {
  try {
    console.log('decabyid',req.params);
    const { id } = req.params; // required cart's id
    const data = await Cart.findByIdAndDelete(id);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const clearCartByUserId = async (req, res) => {
  try {
    const { id } = req.user; // pass user's id to clear it cart
    console.log(id,req.user,"yooo");
    const data = await Cart.deleteMany({ userId: id });
    // console.log(data);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
