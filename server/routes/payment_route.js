const { Router } = require("express");
const paymentController = require("../controllers/payment_controller");
const router = Router();
const verify = require("../middleware/authorizationJWT");

router.post(
  "/cardcheck",
  verify.authorize([1, 2, 3]),
  paymentController.card_check
);
router.get("/paymentdata", paymentController.paymentdata);

module.exports = router;
