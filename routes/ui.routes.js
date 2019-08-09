const router = require("express").Router();
const UserRouter = require("../modules/users/user.routes.ui");
// const ProductRouter = require("../modules/products/product.routes.ui");

/* GET home page. */
router.get("/", (req, res, next) => {
    res.render("index", { title: "Home" });
});

router.use("/users", UserRouter);
// router.use("/products", ProductRouter);



module.exports = router;
