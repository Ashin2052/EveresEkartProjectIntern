var nodemailer = require('nodemailer');


const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "everestkart6@gmail.com",
        pass: "everestkart123"
    },
    tls: {
        rejectUnauthorized: false
    }
})


module.exports = {
    sendMail(from, to, subject,html) {
        return new Promise((resolve, reject) => {
            transport.sendMail({ from, to, subject, html }, (err, done) => {
                if (err) {
                    reject(err)
                         }
                else {
                    resolve(done)
                     }
            })
        })
    }
}