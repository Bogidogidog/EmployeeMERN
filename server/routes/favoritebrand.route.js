const express = require("express");
const router = express.Router();
const FavoriteBrandModel = require("../db/favoritebrand.model.js");

router.get("/", async (req, res) => {
    const favoritebrand = await FavoriteBrandModel.find();
    return res.json(favoritebrand);
});

router.get("/:id", async (req, res) => {
    const favoritebrand = await FavoriteBrandModel.findById(req.params.id);
    return res.json(favoritebrand);
});

router.post("/", async (req, res, next) => {
    const favoritebrand = req.body;

    try {
        const saved = await FavoriteBrandModel.create(favoritebrand);
        return res.json(saved);
    } catch (err) {
        return next(err);
    }

});

router.patch("/:id", async (req, res, next) => {
    console.log("patch")
    try {
        const favoritebrand = await FavoriteBrandModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { ...req.body } },
            { new: true }
        );
        return res.json(favoritebrand);
    } catch (err) {
        return next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const favoritebrand = await FavoriteBrandModel.findById(req.params.id);
        const deleted = await favoritebrand.delete();
        return res.json(deleted);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;