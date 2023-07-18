const router = require('express').Router();
const Category = require('../models/Category');
const Post = require('../models/Post');

const CryptoJS = require("crypto-js")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// CREATE Category
router.post("/", verifyTokenAndAdmin, async (req, res) => {

    const duplicate = await Category.findOne({title: req.body.title});
    if(duplicate){
        return res.status(409).json({message: "Category already exists"})
    }
    const newCat = new Category(req.body);
    try{
       const savedCat =  await newCat.save();
       res.status(200).json({message: "Category created"});
    }catch(e){
        res.status(500).json(e);
    }
});


// DELETE Category
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {

    // category has post?
    const found = await Category.findById(req.params.id);
    if(!found) {
        return res.status(404).json({message: "Category not found"})
    }
    const cat = await Category.findById(req.params.id);
    const post = await Post.findOne({category: cat.title})
    if (post) {
        return res.status(409).json({message: "Error!, cannot delete category with posts"})
    }
   
    try{
        const category = await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "category deleted"});
    }catch(e){
        res.status(500).json(e);
    }
})

// GET Category
router.get("/:id", async (req, res) => {
   
    try{
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    }catch(e){
        res.status(500).json(e);
    }
})
// GET Categories
router.get("/", async (req, res) => {
   
    try{
        const categories = await Category.find().sort({CreatedAt: -1});
        res.status(200).json(categories);
    }catch(e){
        res.status(500).json(e);
    }
})

module.exports = router;