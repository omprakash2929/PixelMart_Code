import express from 'express'
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
import { createCategoryController, deleteCategoryConroller, getCategoryController, singleCategoryController, updateCategoryController } from '../controller/categoryController.js';
const router = express.Router();

//?Routes

//! create category 
router.post('/create-category' , requireSignin, isAdmin, createCategoryController);

//! Update Category

router.put('/update-category/:id', requireSignin, isAdmin, updateCategoryController);

//! all Category

router.get('/get-category', getCategoryController);

//! Single category

router.get('/single-category/:slug', singleCategoryController);

//! Delete Category
router.delete('/delete-category/:id', requireSignin,  isAdmin,deleteCategoryConroller)

export default router;