const { user } = require("../models");

module.exports = {
  createUser: async (req, res) => {
    const { username, password } = req.body;
    user
      .create({
        username: username,
        password: password,
      })
      .then((response) => {
        res.status(201).json({
          data: response,
          message: "data berhasil ditambahkan",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  postLogin: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(req.body);
      const users = await user.findOne({ where: { username: username } });

      if (!users) {
        return res.status(404).json({
          message: "User  not found",
        });
      }
      const isPasswordMatch = (password) => {
        return users.password === password;
      };

      if (!isPasswordMatch(password)) {
        return res.status(400).json({
          message: "Password not match",
        });
      }
      return res.status(200).json({
        message: "Success",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  viewLogin: async (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    res.render("login", { alert });
  },
  loginView: async (req, res) => {
    try {
      const { username, password } = req.body;
      const users = await user.findOne({ where: { username: username } });

      if (!users) {
        // req.flash("alertMessage", "Username not found!");
        // req.flash("alertStatus", "danger");

        res.render("login");
      }
      const isPasswordMatch = (password) => {
        return users.password === password;
      };

      if (!isPasswordMatch(password)) {
        // req.flash("alertMessage", "Password not match!");
        // req.flash("alertStatus", "danger");

        res.render("login");
      }
      req.session.user = {
        id: users.id,
        username: users.username,
      };
      // req.flash("alertMessage", "login berhasil");
      // req.flash("alertStatus", "success");
      res.redirect("/admin");
    } catch (error) {
      // req.flash("alertMessage", "Something wrong!");
      res.render("login");
    }
  },
};
