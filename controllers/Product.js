import cloudinary from 'cloudinary';
import Product from '../model/Product.js';
import getDataUri from '../utils/fileuri.js';

export const createProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    // const file=req.file;
    // const fileUri=getDataUri(file);
    // console.log(fileUri);
    // const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    // productData.thumbnail=myCloud.secure_url;
    // console.log(productData);

    const files = req.files;
    const cloudPromises = files.map(async (file) => {
      const fileUri = getDataUri(file);
      const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
      return myCloud.secure_url;
    });
    const cloudUrls = await Promise.all(cloudPromises);
    // console.log(cloudUrls);
    productData.images = cloudUrls;
    productData.thumbnail = cloudUrls[0];

    const data = new Product(productData);
    const response = await data.save();
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
export const fetchAllProducts = async (req, res) => {
  try {
    let query = Product.find({});
    let totalQuery = Product.find({});
    // console.log(query);
    // let totalLength = await totalQuery.countDocuments();
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
      totalQuery = totalQuery.sort({ [req.query._sort]: req.query._order });
    }
    if (req.query.category) {
      query = query.find({ category: req.query.category });
      totalQuery = totalQuery.find({ category: req.query.category });
    }
    if (req.query.brand) {
      query = query.find({ brand: req.query.brand });
      totalQuery = totalQuery.find({ brand: req.query.brand });
    }
    const totalDocs = await totalQuery.countDocuments();
    // console.log(totalDocs);
    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
    const finalData = await query.exec();
    res.set('X-Total-Count', totalDocs);
    // console.log(totalLength); , totalLength: 
    res.status(200).json({ data: finalData });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
export const fetchProductById = async (req, res) => {
  try {
    // console.log(req); // fetch product by product id
    const { id } = req.params;
    const data = await Product.findById(id);
    res.send({ status: 200, data: data });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
export const updateProductById = async (req, res) => {
  try {
    const updatedProductData = req.body;
    const { id } = req.params;
    // console.log(updatedProductData);
    const data = await Product.findByIdAndUpdate(id, updatedProductData, {
      new: true,
    });
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findByIdAndDelete(id);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
export const deleteAllProducts = async (req, res) => {
  try {
    const data = await Product.deleteMany({});
    res.send({ status: 200, data: data });
  } catch (error) {
    res.send({ status: 500, data: error.message });
  }
};
