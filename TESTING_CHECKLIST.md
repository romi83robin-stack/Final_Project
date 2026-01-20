# Testing Checklist - Complete Flow

## ✅ Step 1: Login
- [ ] Go to http://localhost:5173
- [ ] Click "Login"
- [ ] Enter: rahmanhassang@gmail.com
- [ ] Enter: your password
- [ ] Click "Login"
- [ ] Verify: You see "Home" page

## ✅ Step 2: Navigate to Admin
- [ ] Open sidebar (hamburger menu)
- [ ] Click "➕ Add Product (Admin)"
- [ ] Verify: Form appears with:
  - Description textarea
  - Price input
  - Main Category dropdown
  - Sub Category dropdown (hidden until STITCHED/UNSTITCHED selected)
  - Images file input
  - Sizes checkboxes
  - Submit button

## ✅ Step 3: Add STITCHED Product with Winter Category
- [ ] Fill Description: "Beautiful winter stitched dress"
- [ ] Fill Price: "5000"
- [ ] Select Main Category: "STITCHED"
- [ ] Select Sub Category: "WINTER"
- [ ] Select at least 2 images
- [ ] Click on second image to make it main (blue border appears)
- [ ] Select at least one size (e.g., M)
- [ ] Click "Add Product"
- [ ] Verify: Success alert appears
- [ ] Verify: Page reloads
- [ ] Verify: Form is empty

## ✅ Step 4: Add SHAWLS Product
- [ ] Fill Description: "Beautiful silk shawl"
- [ ] Fill Price: "3000"
- [ ] Select Main Category: "SHAWLS"
- [ ] Verify: Sub Category is hidden
- [ ] Select at least 1 image
- [ ] Verify: Sizes checkboxes are NOT shown (because it's not STITCHED/UNSTITCHED)
- [ ] Click "Add Product"
- [ ] Verify: Success alert appears
- [ ] Verify: Form resets

## ✅ Step 5: View Products on Home
- [ ] Go to Home (click logo)
- [ ] Scroll down to "READY TO WEAR" section
- [ ] Verify: WINTER button appears
- [ ] Click "WINTER" button
- [ ] Verify: Your STITCHED product appears with main image showing

## ✅ Step 6: Add SHAWLS to Cart (No Size)
- [ ] Go to Home
- [ ] Scroll down to find SHAWLS section
- [ ] Click on your SHAWLS product
- [ ] Verify: NO size selection buttons appear
- [ ] Click "Add to Cart"
- [ ] Verify: Success message (no size required error)
- [ ] Go to Cart
- [ ] Verify: SHAWLS item is there without size

## ✅ Step 7: Add STITCHED to Cart (With Size)
- [ ] Go to Home → WINTER section
- [ ] Click on your STITCHED product
- [ ] Verify: Size selection buttons appear (XS, S, M, L, XL)
- [ ] Click on size "M"
- [ ] Click "Add to Cart"
- [ ] Verify: Success message
- [ ] Go to Cart
- [ ] Verify: Product is there with size "M"

## ✅ Step 8: Checkout
- [ ] Go to Cart
- [ ] Verify: Both items are there
- [ ] Click "Proceed to Checkout"
- [ ] Verify: Order summary shows both items
- [ ] Click "Place Order"
- [ ] Verify: Order placed successfully

## ✅ Step 9: Edit Product
- [ ] Go to Admin page
- [ ] Find your STITCHED product and click edit button (if available)
- [ ] OR: Modify form and click "Update Product"
- [ ] Verify: Product updates without error

## ✅ Step 10: Favorites
- [ ] Go to Product page
- [ ] Click on a product
- [ ] Click "Add to Favorites" or heart icon
- [ ] Go to Favorites page
- [ ] Verify: Product appears

---

## Expected Results Summary

| Feature | STITCHED/UNSTITCHED | SHAWLS/DUPATTAS/ESSEMBLES |
|---------|-------------------|---------------------------|
| SubCategory Required | ✅ YES (WINTER/SUMMER/FORMALS) | ❌ NO (auto "ALL") |
| Size Selection | ✅ YES (XS-XL) | ❌ NO |
| Add to Cart | ✅ With Size | ✅ Without Size |
| Main Image | ✅ Selectable | ✅ Selectable |

---

## Debugging Tips

If something fails:

1. **Check Browser Console** (F12) for errors
2. **Check Backend Terminal** for server errors
3. **Check Network Tab** in DevTools to see API responses
4. **Clear localStorage** if having auth issues: `localStorage.clear()`
5. **Refresh page** (Ctrl+R) if state seems stuck

---

## Common Issues & Fixes

### Form not appearing
- Make sure you're logged in as admin
- Check browser console for errors
- Refresh page

### Products not showing
- Check if you actually added products (check backend logs)
- Clear browser cache
- Verify images are being uploaded to Cloudinary

### Size not appearing
- Make sure product is STITCHED or UNSTITCHED
- Check product data in DetailPage

### Cart errors
- Make sure size is selected for STITCHED products
- Size can be empty for SHAWLS/DUPATTAS

---

**Last Updated:** January 19, 2026
**Status:** Ready for Testing
