const router = require('express').Router();
const Testimony = require('../models/Testimony');

const CryptoJS = require("crypto-js")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// CREATE Testimony
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    if(!req.body.name || !req.body.name === ""){
        return res.status(411).json({ message: "Name is required"})
    }
    if(!req.body.desc || !req.body.desc === ""){
        return res.status(411).json({ message: "Message is required"})
    }
    if(!req.body.image || !req.body.image === ""){
        return res.status(411).json({ message: "Image is required"})
    }
    if(!req.body.rating || !req.body.rating === ""){
        return res.status(411).json({ message: "Rating is required"})
    }

    const duplicate = await Testimony.findOne({name: req.body.name});
    if(duplicate) {
        return res.status(409).json({ message: "Name already exists"})
    }
   
    const newTestimony = new Testimony(req.body);
    try{
       const savedTestimony =  await newTestimony.save();
       res.status(200).json({message: "Testimony created successfully"});
    }catch(e){
        res.status(500).json(e);
    }
});

// UPDATE Testimony
router.patch("/:id", verifyTokenAndAdmin, async (req, res) => {
    const exist = await findById(req.params.id);
    if(!exist) {
        return res.status(404).json({ message: "Record not found"})
    }
    try{
        const testimony = await Testimony.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
        res.status(200).json({ message: "Testimony Updated"});
    }catch(e){
        res.status(500).json(e);
    }
})
// DELETE Testimony
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    const exist = await Testimony.findById(req.params.id);
    if(!exist) {
        return res.status(404).json({ message: "Record not found"})
    }
    try{
        const testimony = await Testimony.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Testimony deleted"});
    }catch(e){
        res.status(500).json(e);
    }
})

// GET Testimony
router.get("/:id", async (req, res) => {
   
    try{
        const testimony = await Testimony.findById(req.params.id);
        res.status(200).json(testimony);
    }catch(e){
        res.status(500).json(e);
    }
})
// GET All Testimonys
router.get("/", async (req, res) => {
   
    try{
        const testimonies = await Testimony.find(req.params.id);
        res.status(200).json(testimonies);
    }catch(e){
        res.status(500).json(e);
    }
})

module.exports = router;