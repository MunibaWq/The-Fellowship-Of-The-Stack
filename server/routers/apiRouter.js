const router = require('express').Router()
const stockRouter = require("./stockRouter");
const imageRouter = require("./imageRouter");
const productRouter = require("./productRouter");
const dashboardRouter = require("./dashboardRouter");
const eventRouter = require("./eventRouter");
const orderRouter = require("./orderRouter");
const userRouter = require("./userRouter");

router.use("/stock", stockRouter);
router.use("/images", imageRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/events", eventRouter);
router.use("/dashboard", dashboardRouter);
router.use("/orders", orderRouter);
router.use('/cart',cartRouter)
module.exports = router;