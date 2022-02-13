const axios = require("axios");
const local = process.env.LOCAL;

exports.homeRoutes = (req, res) => {
  axios
    .get("http://localhost:5000/" + "api/users")
    .then(function (resp) {
      console.log("myd ", resp.data);
      res.render("index", { users: resp.data });
    })
    .catch((err) => res.send(err));
};
exports.add_user = (req, res) => {
  res.render("add_user");
};
exports.update_user = (req, res) => {
  axios
    .get("http://localhost:5000/api/users", { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render("update_user", { user: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
