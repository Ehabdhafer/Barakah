const { Router } = require("express");
const userController = require("../controllers/users_controller");
const router = Router();

router.post("/registration", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/alluser", userController.getUserDetails);
router.get("/user/:user_id", userController.getuserinfo);
router.put("/updateuser/:user_id", userController.update_user);
router.put("/deleteuser/:user_id", userController.delete_user);

module.exports = router;
