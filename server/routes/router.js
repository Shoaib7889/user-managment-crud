const express = require("express");
const route = express.Router();
const services = require("../services/render");
const controller = require("../controller/controller");
const Userdb = require("../model/model");

route.get("/", services.homeRoutes);
route.get("/add-user", services.add_user);
route.get("/update-user", services.update_user);

route.post("/api/users", controller.create);
route.get("/api/users", controller.find);
// route.get("/api/users", (req, res) => {
//   Userdb.find()
//     .then((user) => res.send(user))
//     .catch((err) => res.status(400).send({ message: "Error getting user" }));
// });
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);

module.exports = route;
