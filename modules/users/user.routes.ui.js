const router = require("express").Router();
const usercontroller = require("./user.controller");

router.get("/signup", (req, res) => {
    res.render("users/signup", { title: "users registration" });
});

router.get("/login", (req, res,next) => {
    
    
    res.render("users/login", { title: "login" });

});

router.get("/list", (req, res, next) => {
    usercontroller.list()
        .then(d =>{
            console.log(d);
            res.render("users/list", { title: "login", user: d })
        })
        .catch(e => next(e));

});
// router.get("/userInfo", (req, res, next) => {
//     console.log("aaaaa");
//     controller.get()
//         .then(d =>{
//             console.log(d);
//             res.render("users/userInfo", { title: "login", user: d })
//         })
//         .catch(e => next(e));

// });


router.get("/edit/:id", (req, res,next) => {
    usercontroller.get(req.params.id)
    .then(d => {
     res.render("users/edit", { title:"userinfo", user:d });
    })
    .catch(next);

});

router.get("/delete/:id", (req, res,next) => {
    usercontroller.get(req.params.id)
    .then(d => {
     res.render("users/delete", { title:"userinfo", user:d });
    })
    .catch(next);

});


module.exports = router;