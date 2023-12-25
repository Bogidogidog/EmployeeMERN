const express = require("express");
const router = express.Router();
const EmployeeModel = require("../db/employee.model");

router.get("/", async (req, res) => {
	const { level, position, sort, sortByNameAscDes } = req.query
	const query = {};
	const sorting = {};

	// filter
	if (level) {
		query.level = { $regex: "^" + `${level}`, $options: "i" } // i stands for case insensitive matching, ^ beginning
	}

	if (position) {
		query.position = { $regex: "^" + `${position}`, $options: "i" }
	}

	// sort

	if (sort === "level") {
		sorting.level = 1;
	}

	if (sort === "position") {
		sorting.position = 1;
	}

	// sortByName

	if (sortByNameAscDes === "asc") {
		sorting.name = 1;
	}
	if (sortByNameAscDes === "des") {
		sorting.name = -1;
	}

	// add .limit and .skip for Task 7 pagination
	const employees = await EmployeeModel.find(query)
		.sort(sorting)
		.populate("favoritebrand") 
		.populate("company") 
	return res.json(employees);
});


router.get("/:id", async (req, res) => {
	const employee = await EmployeeModel.findById(req.params.id);
	return res.json(employee);
});

// added /search so it bc otherwise it is matching the :id route

router.get("/search/:search", async (req, res, next) => {
	try {
		const searchQuery = req.params.search.toString();
		const employees = await EmployeeModel.find({
			name: { $regex: searchQuery, $options: "i" },
		});
		return res.json(employees);
	} catch (err) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});


router.post("/", async (req, res, next) => {
	const employee = req.body;
	try {
		const saved = await EmployeeModel.create(employee);
		return res.json(saved);
	} catch (err) {
		return next(err);
	}
});

router.patch("/:id", async (req, res, next) => {
	try {
		const employee = await EmployeeModel.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: { ...req.body } },
			{ new: true }
		);
		return res.json(employee);
	} catch (err) {
		return next(err);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const employee = await EmployeeModel.findById(req.params.id);
		const deleted = await employee.delete();
		return res.json(deleted);
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
