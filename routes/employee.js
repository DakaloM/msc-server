const router = require('express').Router();
const Employee = require('../models/Employee');

const CryptoJS = require("crypto-js")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// CREATE Employee
router.post("/", verifyTokenAndAdmin, async (req, res) => {

    if(!req.body.firstname || req.body.firstname === ""){
        return res.status(411).json({message: "First name is required"})
    }
    else if(!req.body.lastname || req.body.lastname === ""){
        return res.status(411).json({message: "Last name is required"})
    }
    if(!req.body.role || req.body.role === ""){
        return res.status(411).json({message: "Role is required"})
    }

    const duplicate = await Employee.findOne({firstname: req.body.firstname, lastname: req.body.lastname})
    if(duplicate) {
        return res.status(409).json({message: `Employee ${req.body.firstname} ${req.body.lastname} already exists`})
    }
    const newEmployee = new Employee(req.body);
    try{
       const savedEmployee =  await newEmployee.save();
       res.status(200).json({message: `Employee ${req.body.firstname} ${req.body.lastname} was created`});
    }catch(e){
        res.status(500).json(e);
    }
});

// UPDATE Employee
router.patch("/:id", verifyTokenAndAdmin, async (req, res) => {


    const exist = await Employee.findById(req.params.id)
    if(!exist) {
        return res.status(404).json({message: `Employee with Id: ${req.params.id} does not exist`});
    }

    try{
        const employee = await Employee.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
        res.status(200).json({message: `Employee with Id: ${req.params.id} has been updated`});
    }catch(e){
        res.status(500).json(e);
    }
})
// DELETE Employee
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    const exist = await Employee.findById(req.params.id)
    if(!exist) {
        return res.status(404).json({message: `Employee with Id: ${req.params.id} does not exist`});
    }
    try{
        const employee = await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json({message : `Employee ${employee.firstname}  ${employee.lastname} has been deleted`});
    }catch(e){
        res.status(500).json(e);
    }
})

// GET Employee
router.get("/:id", async (req, res) => {
    
    try{
        const employee = await Employee.findById(req.params.id);
        res.status(200).json(employee);
    }catch(e){
        res.status(500).json(e);
    }
})
// GET All Employees
router.get("/", async (req, res) => {
   
    try{
        const Employees = await Employee.find(req.params.id);
        res.status(200).json(Employees);
    }catch(e){
        res.status(500).json(e);
    }
})

module.exports = router;