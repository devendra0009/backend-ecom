import Brand from '../model/Brand.js';

export const fetchAllBrands = async (req, res) => {
  try {
    const data = await Brand.find({});
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const fetchBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Brand.findById(id);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createBrand = async (req, res) => {
  try {
    const productData = req.body;
    const data = await new Brand(productData);
    const response = await data.save();
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateBrandById = async (req, res) => {
  try {
    const updatedBrandData = req.body;
    const { id } = req.params;
    // console.log(updatedProductData);
    const data = await Brand.findByIdAndUpdate(id, updatedBrandData, {
      new: true,
    });
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Brand.findByIdAndDelete(id);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteAllBrands = async (req, res) => {
  try {
    const data = await Brand.deleteMany({});
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
