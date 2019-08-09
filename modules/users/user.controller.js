const mongoose = require("mongoose");
const usermodel = require("./user.model");
const bcrypt = require("bcryptjs");

const mailer = require('../../utils/mailer')

class User {
    constructor() { }


    signup(payload, file) {
        return new Promise((resolve, reject) => {
            usermodel.findOne
                ({
                    username: payload.username
                }).then((user) => {
                    if (user) {
                        return reject
                            ({
                                message: "user already exist"
                            })
                    }
                    else {
                        let newUser = new usermodel();
                        newUser.username = payload.username;
                        newUser.password = payload.password;
                        newUser.age = payload.age;
                        newUser.gender = payload.gender;
                        if (file) newUser.imgUrl = file.path;
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(payload.password, salt, (err, hash) => {
                                newUser.password = hash;
                                newUser.save()
                                    .then(async user => {
                                        await mailer.sendMail("acb@gmail.com", user.username, "hi", `<p>thank you</p>`);
                                        resolve(user)
                                    })
                                    .catch(error => reject(error))
                            })
                        })
                    }

                })
        })
    }



    update(id, payload) {
        console.log("globle obj",payload)
        return new Promise((resolve, reject) => {
            let updateUser = {
                username: payload.username,
                age: payload.age,
                gender: payload.gender
            }
            usermodel.findOneAndUpdate({ _id: id }, updateUser)
                .then(d => resolve(d))
                .catch(e => reject(e))
        })


    }
    get(userid) {
        return new Promise((resolve, reject) => {
            usermodel.findById(userid)
                .then(d => resolve(d))
                .catch(e => reject(e));
        });
    }

    list() {
        return new Promise((resolve, reject) => {
            usermodel.find({})
                .then(d => resolve(d))
                .catch(e => reject(e));
        });
    }

    remove(userid) {
        return new Promise((resolve, reject) => {
            usermodel.remove({
                _id: userid
            })
                .then(d => resolve(d))
                .catch(e => reject(e));
        });
    }

    login(payload) {
        return new Promise((resolve, reject) => {
            usermodel.findOne({
                username: payload.username
            }).then(user => {
                if (!user) {
                    return reject({
                        message: "user not found"
                    })
                }
                bcrypt.compare(payload.password, user.password).then(isMatch => {
                    if (isMatch) {
                        resolve(user)
                    } else {
                        return reject({
                            message: "user password do not match"
                        })
                    }
                })
            }).catch(err => reject(err))
        });
    }

}
module.exports = new User(); 