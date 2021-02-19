const auth = require("../middleware/auth");
const router = require("express").Router();
const stockRouter = require("./stockRouter");
const imageRouter = require("./imageRouter");
const eventImageRouter = require("./eventImageRouter");
const productRouter = require("./productRouter");
const dashboardRouter = require("./dashboardRouter");
const eventRouter = require("./eventRouter");
const orderRouter = require("./orderRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const messageRouter = require("./messageRouter");

router.use("/stock", stockRouter);
router.use("/images", imageRouter);
router.use("/eventImages", eventImageRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/events", eventRouter);
router.use("/dashboard", dashboardRouter);
router.use("/orders", orderRouter);
router.use("/cart", cartRouter);
router.use("/messages", messageRouter);

module.exports = router;
