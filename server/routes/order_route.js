const { Router } = require("express");
const orderController = require("../controllers/order_controller");
const router = Router();
const verify = require("../middleware/authorizationJWT");

// verify.authorize([1]);

router.get("/getallorder", orderController.getorder);
router.post("/postorder", orderController.postorder);
router.get("/getorder/:id", orderController.getorderid);
router.put("/updateorder/:id", orderController.updateorder);
router.put("/deleteorder/:id", orderController.deleteorder);
router.get("/getorderhistory/:id", orderController.getorderhistory);

module.exports = router;
