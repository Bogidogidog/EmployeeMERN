/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const brand = require("./favoritebrand.json");
const EmployeeModel = require("../db/employee.model");
const FavoriteBrandModel = require("../db/favoritebrand.model.js");

const CompanyModel = require("../db/company.model");
const companies = require("./company.json");


const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
	console.error("Missing MONGO_URL environment variable");
	process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

// Task 8
let createdBrand
const populateFavoriteBrand = async () => {
	await FavoriteBrandModel.deleteMany({});

	const favoriteBrands = brand.map((brand) => ({
		name: brand,
	}));
	createdBrand = await FavoriteBrandModel.create(...favoriteBrands);
	console.log("favorite brands created");
};

let createdCompany
const populateCompany = async () => {
   await CompanyModel.deleteMany({});


   const companyArray = companies.map((company) => ({
       name: company,
   }));
   createdCompany = await CompanyModel.create(...companyArray);
   console.log("companies created");
};


const populateEmployees = async () => {
	await EmployeeModel.deleteMany({});

	const employees = names.map((name) => ({
		name,
		level: pick(levels),
		position: pick(positions),
		favoritebrand: pick(createdBrand),
		company: pick(createdCompany) //TASK 1
	}));

	await EmployeeModel.create(...employees);
	console.log("Employees created");
};

const main = async () => {
	await mongoose.connect(mongoUrl);

	await populateFavoriteBrand();

	await populateCompany() // TASK1

	await populateEmployees();

	await mongoose.disconnect();
};

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
