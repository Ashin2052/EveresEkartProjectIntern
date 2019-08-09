const router = require("express").Router();

const usercontroller = require("./user.controller");
const upload = require('../../utils/img');


router.post("/", upload.single('imgurl'), (req, res, next) => {
    console.log("hhh");
    usercontroller.signup(req.body, req.file)
        .then(d => {
            res.redirect("/users/login")
            // res.json(d)
        })
        .catch(next);
});

router.post('/login', (req, res, next) => {
    console.log("hi")
    usercontroller.login(req.body)
        .then(d => {
            res.redirect("/api/v1/user/" + d._id);
          
 console.log("hhh")           // res.json(d) 
        })
        .catch(next);
});

router.put("/:id", (req, res, next) => {
    usercontroller.update(req.params.id, req.body)
        .then(d => {
            res.render("users/userInfo", { title: "userinfo", user: d });
        })
        .catch(next)
});

router.get("/:id", (req, res, next) => {

    usercontroller.get(req.params.id)
        .then(d => {
            console.log("fgf")           // res.json(d) 

            res.render("users/userInfo", { title: "userinfo", user: d });
        })
        .catch(next);
});

router.get("/", (req, res, next) => {
    usercontroller.list()
        .then(d => res.json(d))
        .catch(next);
});

router.delete("/:id", (req, res, next) => {

    usercontroller.remove(req.params.id)
        .then(d => res.json(d))
        .catch(next);
});



module.exports = router;