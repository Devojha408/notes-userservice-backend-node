const router = require("express").Router();
const { checkToken } = require("../auth/token_authorization");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser
} = require("./user.controller");
router.get("/", checkToken, getUsers);
router.post("/signup", createUser);
router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.put("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);

module.exports = router;