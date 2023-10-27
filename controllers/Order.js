import Order from '../model/Order.js';


export const fetchAllOrders = async (req, res) => {
  try {
    let query = Order.find({});
    const totalDocs = await Order.countDocuments();

    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit);
      const page = parseInt(req.query._page);
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    const finalData = await query.exec();

    res.set('X-Total-Count', totalDocs);
    res.status(200).json({ data: finalData });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const fetchOrdersById = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(id,"userid");
    const data = await Order.findOne({userId:id});
    // console.log(data);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const fetchOrdersByUserId = async (req, res) => {
  try {
    const { id } = req.user;
    // console.log(id);
    const data = await Order.find({ userId: id });
    // console.log(data);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createOrder = async (req, res) => {
  try {
    const orderItem = req.body;
    const data = new Order(orderItem);
    const response = await data.save();
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const updateOrderById = async (req, res) => {
  try {
    const updatedOrderData = req.body;
    const { id } = req.user; // pass order's id
    // console.log(updatedCartData, id);
    const data = await Order.findByIdAndUpdate(id, updatedOrderData, {
      new: true,
    });
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.user; // required order's id
    const data = await Order.findByIdAndDelete(id);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
