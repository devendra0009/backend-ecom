import Category from '../model/Category.js';

export const fetchAllCategories = async (req, res) => {
  try {
    const data = await Category.find({});
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const fetchCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findById(id);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const productData = req.body;
    const data = await new Category(productData);
    const response = await data.save();
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateCategoryById = async (req, res) => {
  try {
    const updatedCategoryData = req.body;
    const { id } = req.params;
    // console.log(updatedProductData);
    const data = await Category.findByIdAndUpdate(id, updatedCategoryData, {
      new: true,
    });
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findByIdAndDelete(id);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteAllCategories = async (req, res) => {
  try {
    const data = await Brand.deleteMany({});
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
