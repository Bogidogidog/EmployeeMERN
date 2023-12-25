require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const employeesRoute = require("./routes/employees.route");
const equipmentRoute = require("./routes/equipment.route");
const favoriteBrandRoute = require("./routes/favoritebrand.route");

const companyRoute = require("./routes/company.route");


const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.use("/api/employees/", employeesRoute);
app.use("/api/equipment/", equipmentRoute);
app.use("/api/favoritebrand/", favoriteBrandRoute);

app.use("/api/company/", companyRoute);


const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
