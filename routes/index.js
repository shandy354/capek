const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const tanamanController = require("../controller/tanamanController");
const { upload } = require("../libs/hadleUpload");

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/detil", (req, res) => {
  res.render("detil");
});

// router.get('/login', (req, res) => {
//   res.render('login');
// });

router.post("/login", userController.loginView);
router.get("/login", userController.viewLogin);

// router.get('/register', (req, res) => {
//   res.render('register');
// });

// API
router.post("/createuser", userController.createUser);
router.post("/login", userController.postLogin);

// API TANAMAN
router.get("/tanamann", tanamanController.index);
router.get("/detil/:id", tanamanController.detil);
router.get("/delet/:id", tanamanController.deleteApi);
router.post("/add", upload.single("img"), tanamanController.create);
router.post("/edit/:id", upload.single("img"), tanamanController.update);

// api view tanaman
router.get("/tanaman", tanamanController.indexView);
router.get("/tanaman/:id", tanamanController.detilView);
router.get("/showedit/:id", tanamanController.showView);
router.get("/add", tanamanController.addView);
router.get("/delete/:id", tanamanController.deleteView);
router.post("/aadd", upload.single("img"), tanamanController.createView);
router.post("/eedit/:id", upload.single("img"), tanamanController.updateView);

// api view admin

router.get("/admin", tanamanController.adminView);
module.exports = router;
