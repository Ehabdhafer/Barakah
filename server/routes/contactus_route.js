const { Router } = require("express");
const contactcontroller = require("../controllers/contactus_controller");
const router = Router();
const verify = require("../middleware/authorizationJWT");

router.get("/getcontact", contactcontroller.getcontact);

module.exports = router;
