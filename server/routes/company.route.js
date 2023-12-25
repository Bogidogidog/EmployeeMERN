const express = require("express");
const router = express.Router();
const CompanyModel = require("../db/company.model");


router.get("/", async (req, res) => {
   const company = await CompanyModel.find();
   return res.json(company);
});


router.get("/:id", async (req, res) => {
   const company = await CompanyModel.findById(req.params.id);
   return res.json(company);
});


router.post("/", async (req, res) => {
   const company = req.body;
   try {
       const saved = await CompanyModel.create(company);
       return res.json(saved);
   } catch (err) {
       return next(err);
   }
});


router.patch("/:id", async (req, res, next) => {
   try {
       const company = await CompanyModel.findOneAndUpdate(
           { _id: req.params.id },
           { $set: { ...req.body } },
           { new: true }
       );
       return res.json(company);
   } catch (err) {
       return next(err);
   }
});


router.delete("/:id", async (req, res, next) => {
   try {
       const company = await CompanyModel.findById(req.params.id);
       const deleted = await company.delete();
       return res.json(deleted);
   } catch (err) {
       return next(err);
   }
});




module.exports = router;
