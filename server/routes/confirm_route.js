const { Router } = require("express");
const confirmController = require("../controllers/confirm_controller.js");
const router = Router();
const verify = require("../middleware/authorizationJWT");

router.post("/postconfirm", confirmController.postconfirm);
router.get("/getconfirm", confirmController.getconfirm);
router.get("/getconfirm/:id", confirmController.getconfirmid);
router.put("/deleteconfirm/:id", confirmController.deleteconfirm);
router.get("/getconfirmhistory/:id", confirmController.getHistory);

module.exports = router;
