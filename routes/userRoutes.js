const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controllers/userController");

const router = require("express").Router();

//get all user ||GET
router.get("/all-users", getAllUsers);

//CREATE USER || POST
router.post("/register", registerController);

//LOGIN ||POST
router.post("/login", loginController);
module.exports = router;
