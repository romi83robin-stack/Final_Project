# 🔧 Cloudinary Configuration Details

## Your Cloudinary Setup

### Account Details
```
Cloud Name: dcpacusxh
API Key: 397881516666721
API Secret: nZ4qxqZnmAt0ghYkpHZsgpCRv5Q
```

### Dashboard URL
```
https://cloudinary.com/console/c-dcpacusxh/dashboard
```

## Backend Configuration

### File: `Backend/config/cloudinary.js`
```javascript
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dcpacusxh",
  api_key: process.env.CLOUDINARY_API_KEY || "397881516666721",
  api_secret: process.env.CLOUDINARY_API_SECRET || "nZ4qxqZnmAt0ghYkpHZsgpCRv5Q",
});

export default cloudinary;
```

### Environment Variables: `Backend/.env`
```
CLOUDINARY_CLOUD_NAME=dcpacusxh
CLOUDINARY_API_KEY=397881516666721
CLOUDINARY_API_SECRET=nZ4qxqZnmAt0ghYkpHZsgpCRv5Q
```

## Upload Process

### Middleware: `Backend/middleware/cloudinaryUpload.js`
- Uses multer memoryStorage
- Files stored in memory temporarily
- Max file size: 5MB
- Only accepts image files

### Upload Function: `Backend/controllers/productController.js`
```javascript
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
```

### Folder Structure in Cloudinary
```
cloudinary.com/
  └── dcpacusxh/
      └── baroque_dresses/
          ├── image1.jpg
          ├── image2.jpg
          ├── image3.jpg
          └── ... (all uploaded images)
```

## Image URL Format

### Cloudinary URLs returned look like:
```
https://res.cloudinary.com/dcpacusxh/image/upload/v1234567890/baroque_dresses/image-name.jpg
```

### Stored in Database as:
```javascript
{
  _id: "...",
  description: "Product name",
  price: 1000,
  images: [
    "https://res.cloudinary.com/dcpacusxh/image/upload/v1234567890/baroque_dresses/img1.jpg",
    "https://res.cloudinary.com/dcpacusxh/image/upload/v1234567890/baroque_dresses/img2.jpg"
  ],
  // ... other fields
}
```

## Frontend Display

### Before (Local Storage):
```javascript
src={`http://localhost:5000/uploads/${item.images[0]}`}
```

### After (Cloudinary):
```javascript
src={item.images?.[0] || "https://via.placeholder.com/300"}
```

## API Endpoints (No Changes Required)

All endpoints work the same way:
- `POST /api/products` - Add product with images (multer.array("images", 10))
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `PUT /api/products/:id` - Update product with new images
- `DELETE /api/products/:id` - Delete product

## Limits

### File Upload:
- **Max file size:** 5MB per image
- **Max files per request:** 10 images
- **Accepted formats:** All image formats (jpg, png, gif, webp, etc.)

### Cloudinary Free Plan:
- **Storage:** 5GB
- **Monthly transformations:** 25,000
- **Bandwidth:** 1GB/month
- **Images:** Unlimited

## Security

### API Keys:
- ✅ Public Key (API Key) - Safe to share in client
- ⚠️ Private Key (API Secret) - Keep secret (in .env)
- ⚠️ JWT Token - Used for auth, not Cloudinary

### URL Security:
- ✅ Cloudinary URLs are secure by default
- ✅ Images can be private if configured
- ✅ No unauthorized uploads possible

## Monitoring Uploads

### Check Cloudinary Dashboard:
1. Go to `https://cloudinary.com/console/c-dcpacusxh/media`
2. Look for "baroque_dresses" folder
3. See all uploaded images
4. Check usage statistics

## Troubleshooting

### Upload Fails:
- ❌ Check image size < 5MB
- ❌ Check internet connection
- ❌ Check CLOUDINARY credentials in .env

### Images Don't Display:
- ❌ Check URL format is correct
- ❌ Check image exists in Cloudinary dashboard
- ❌ Check browser console for 404 errors

### Credentials Wrong:
- ❌ Update .env file with correct values
- ❌ Restart backend server
- ❌ Try uploading again

## Useful Links

- **Dashboard:** https://cloudinary.com/console/c-dcpacusxh/dashboard
- **Media Library:** https://cloudinary.com/console/c-dcpacusxh/media
- **Settings:** https://cloudinary.com/console/c-dcpacusxh/settings/upload
- **API Reference:** https://cloudinary.com/documentation/image_upload_api

---

**Your Cloudinary is ready to use!** 🚀
