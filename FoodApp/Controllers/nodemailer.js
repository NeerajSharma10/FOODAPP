const nodemailer = require("nodemailer");

module.exports.sendMail = async function(str, data) {
    receivers_email = data.email;
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "neerajsh1012@gmail.com",
            pass: "ocbqrwtkceylxssp"
        }
    });


    let Osubject, Otext, Ohtml;

    if (str == "signup") {
        Osubject = `Thankyou you signing in ${data.email}`;
        Ohtml = `
        <h1>
        🙏🙏Welcome to FoodApp.com
        😎😎Have a good time !
        ✔️✔️Here are your details : -> 
        Name : ${data.name}
        Email : ${data.email} 
        </h1>
        `
    } else {
        console.log("hekekeihue");

        Osubject = `Reset Password`;
        Ohtml = `
        <h1>
        🙏🙏From FoodApp.com
        Here is your link to reset your password
        </h1>
        ${data.resetPasswordLink}
        `;

    }
    let info = transporter.sendMail({
        from: "neerajsh1012@gmail.com",
        to: data.email,
        subject: Osubject,
        html: Ohtml,
        text: Otext

    });
    console.log("Message is sent");
}