const router = require('express').Router();
const Slide = require('../models/Slide');

const CryptoJS = require("crypto-js")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// CREATE Slide
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const duplicate = await Slide.findOne({title: req.body.title})
    if(duplicate) {
        return res.status(409).json({message: "Title already in use"})
    }
    const newSlide = new Slide(req.body);
    try{
       const savedSlide =  await newSlide.save();
       res.status(200).json(savedSlide);
    }catch(e){
        res.status(500).json(e);
    }
});

// UPDATE Slide
router.patch("/:id", verifyTokenAndAdmin, async (req, res) => {
    const exists = await Slide.findById(req.params.id)
    if(!exists) {
        return res.status(404).json({message: "Slide not Found"})
    }
   
    try{
        const slide = await Slide.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
        res.status(200).json(slide);
    }catch(e){
        res.status(500).json(e);
    }
})
// DELETE Slide
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    const exists = await Slide.findById(req.params.id)
    if(!exists) {
        return res.status(404).json({message: "Slide not Found"})
    }
    try{
        const slide = await Slide.findByIdAndDelete(req.params.id);
        res.status(200).json("Slide deleted");
    }catch(e){
        res.status(500).json(e);
    }
})

// GET Slide
router.get("/:id", async (req, res) => {
    const exists = await Slide.findById(req.params.id)
    if(!exists) {
        return res.status(404).json({message: "Slide not Found"})
    }
    try{
        const slide = await Slide.findById(req.params.id);
        res.status(200).json(slide);
    }catch(e){
        res.status(500).json(e);
    }
})
// GET All Slides
router.get("/", async (req, res) => {
   
    try{
        const slides = await Slide.find(req.params.id);
        res.status(200).json(slides);
    }catch(e){
        res.status(500).json(e);
    }
})

module.exports = router;