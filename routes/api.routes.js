const router = require("express").Router();

const UserRouter = require("../modules/users/user.routes.api");

// const ProductRouter = require("../modules/products/product.routes.api");


router.use("/user", UserRouter);
// router.use("/product", ProductRouter);


module.exports = router;
