# Cloudinary Integration Setup

## Installation Steps

### 1. Backend Setup

#### Install Dependencies
```bash
cd Backend
npm install cloudinary express-fileupload
```

#### Environment Variables (.env)
The following variables are already added to `.env`:
```
CLOUDINARY_CLOUD_NAME=dcpacusxh
CLOUDINARY_API_KEY=397881516666721
CLOUDINARY_API_SECRET=nZ4qxqZnmAt0ghYkpHZsgpCRv5Q
```

#### Files Created/Modified:
- `config/cloudinary.js` - Cloudinary configuration
- `middleware/cloudinaryUpload.js` - New Cloudinary upload middleware (replaces upload.js)
- `controllers/productController.js` - Updated to handle Cloudinary uploads
- `routes/productRoutes.js` - Updated to use new middleware
- `server.js` - Removed local uploads folder middleware

### 2. Frontend Setup

No additional packages needed. All image URLs are now Cloudinary direct URLs.

#### Files Modified:
- `src/components/ProductComponents/ProductList.jsx`
- `src/pages/CartPage.jsx`
- `src/pages/CheckOut.jsx`
- `src/pages/DetailPage.jsx`
- `src/pages/FavouritePage.jsx`
- `src/components/ProductDetailComponents/RelatedProducts.jsx`

All these files now use Cloudinary URLs directly instead of `http://localhost:5000/uploads/`

### 3. How It Works

#### Adding Products:
1. User selects multiple images in the form
2. Images are uploaded to Cloudinary (folder: "baroque_dresses")
3. Cloudinary returns secure URLs
4. URLs are stored in MongoDB database
5. Frontend displays images directly from Cloudinary

#### Benefits:
✅ No local storage needed
✅ Multiple images support
✅ Automatic image optimization
✅ CDN delivery for fast loading
✅ Secure image URLs
✅ Easy to scale

### 4. Running the Server

```bash
# Terminal 1 - Backend
cd Backend
npm run dev

# Terminal 2 - Frontend  
cd Frontend
npm run dev
```

### 5. Testing

1. Go to Admin Page
2. Add a new product with multiple images
3. Images will be uploaded to Cloudinary automatically
4. Check the product list to see images displayed from Cloudinary
5. Images should load properly on all pages (detail, cart, favorites, etc.)

---

**Setup Complete!** 🎉 Your project now uses Cloudinary for image management.
