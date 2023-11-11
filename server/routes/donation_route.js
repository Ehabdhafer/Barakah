const { Router } = require("express");
const donationController = require("../controllers/donation_controller");
const router = Router();
const verify = require("../middleware/authorizationJWT");

router.get("/getdonation", donationController.getdonation);
router.post("/postdonation", donationController.postdonation);
router.post("/postdonationbusiness", donationController.postdonationbusiness);
router.get("/donation/:id", donationController.getdonationid);
router.put("/updatedonation/:id", donationController.updatedonation);
router.put("/deletedonation/:id", donationController.deletedonation);

module.exports = router;
