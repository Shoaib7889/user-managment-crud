const Userdb = require("../model/model");

//create and save new user
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cant be empty" });
  }

  //create user and save
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });
  user
    .save(user)
    .then((data) => res.redirect("add-user"))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Some err occured while creating the user",
      })
    );
};

//create and save new user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((user) => res.send(user))
      .catch((err) =>
        res.status(400).send({ message: "Error getting single user" })
      );
  } else {
    Userdb.find()
      .then((user) => res.send(user))
      .catch((err) => res.status(400).send({ message: "Error getting user" }));
  }
};
//create and save new user=
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const id = req.params.id;
  await Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found!`,
        });
      } else {
        res.redirect("update-user");
        // res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};
//create and save new user
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete with id ${id}. Maybe id is wrong`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
