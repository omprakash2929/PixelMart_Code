import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async(req ,res) =>{
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({
                message:'Name is require'
            })
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            res.status(200).send({
                success:true,
                message:'category is Already Exisrits'
            })
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message:'New category Created',
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in category"
        })
    }
}

//! Update controller

export const updateCategoryController =  async (req, res) =>{
    try {
        const {name} = req.body;
        const {id} = req.params;

        const category = await categoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)},{new:true});

        res.status(200).send({
            success:true,
            category,
            message:'Category name is update'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in update"
        })
        
    }
}

//! all category Controller

export const getCategoryController = async(req, res) =>{
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:"all category list ",
            category,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in search "
        })
        
    }

}

//! single category controller


export const singleCategoryController = async(req, res) =>{

    const category = await categoryModel.findOne({slug:req.params.slug});
    res.status(200).send({
        success:true,
        message:'Find the single category',
        category
    })
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in single category',
            error
        })
        
    }
}

// Delete Category Controller

export const deleteCategoryConroller =async (req, res) =>{

    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Delete succfull",
            
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in delete category",
            error
        })
        
    }
}