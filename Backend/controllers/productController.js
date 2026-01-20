import Product from "../models/ProductModel.js";
import cloudinary from "../config/cloudinary.js";

// ================= CLOUDINARY UPLOAD HANDLER =================
const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "baroque_dresses",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );

    stream.end(file.buffer);
  });
};

// ================= ADD PRODUCT =================
export const addProduct = async (req, res) => {
  try {
    const {
      description,
      price,
      mainCategory,
      subCategory,
      category,
      sizes,
      mainImageIndex,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images are required" });
    }

    if (!mainCategory || !subCategory) {
      return res
        .status(400)
        .json({ message: "Main category and sub category are required" });
    }

    // Upload images to Cloudinary
    const imageUrls = [];
    for (const file of req.files) {
      try {
        const url = await uploadToCloudinary(file);
        imageUrls.push(url);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

    let sizesArray = [];
    if (Array.isArray(sizes)) {
      sizesArray = sizes;
    } else if (typeof sizes === "string") {
      sizesArray = sizes.split(",").map((s) => s.trim());
    }

    const product = await Product.create({
      description,
      price,
      mainCategory: mainCategory.toUpperCase(),
      subCategory:
        subCategory.toUpperCase() === "ALL"
          ? ""
          : subCategory.toUpperCase(),
      category: category || subCategory.toUpperCase(),
      sizes: sizesArray,
      images: imageUrls,
      mainImageIndex: mainImageIndex || 0,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Add product error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL PRODUCTS =================
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET SINGLE PRODUCT =================
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE PRODUCT =================
export const updateProduct = async (req, res) => {
  try {
    const {
      description,
      price,
      mainCategory,
      subCategory,
      category,
      sizes,
      mainImageIndex,
    } = req.body;

    const updatedData = {
      description,
      price,
      mainImageIndex,
    };

    if (mainCategory) {
      updatedData.mainCategory = mainCategory.toUpperCase();
    }

    if (subCategory) {
      updatedData.subCategory =
        subCategory.toUpperCase() === "ALL"
          ? ""
          : subCategory.toUpperCase();
      updatedData.category = updatedData.subCategory || category;
    }

    if (sizes) {
      if (Array.isArray(sizes)) {
        updatedData.sizes = sizes;
      } else if (typeof sizes === "string") {
        updatedData.sizes = sizes.split(",").map((s) => s.trim());
      }
    }

    // Upload new images to Cloudinary if provided
    if (req.files && req.files.length > 0) {
      const imageUrls = [];
      for (const file of req.files) {
        try {
          const url = await uploadToCloudinary(file);
          imageUrls.push(url);
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          return res.status(500).json({ message: "Failed to upload image" });
        }
      }
      updatedData.images = imageUrls;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE PRODUCT (FIXED) =================
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
