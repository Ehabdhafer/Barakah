const { Router } = require("express");
const feedbackController = require("../controllers/feedback_controller");
const router = Router();
const verify = require("../middleware/authorizationJWT");

router.get("/getallfeedbacks", feedbackController.getfeedback);
router.post(
  "/postfeedback",
  verify.authorize([2, 3, 4]),
  feedbackController.postfeedback
);
router.get("/feedback/:id", feedbackController.feedbackid);
router.put(
  "/deletefeedback/:id",
  verify.authorize([1]),
  feedbackController.deletefeedback
);

module.exports = router;
