const nodemailer = require('nodemailer')
require('dotenv').config()
const hbs = require('nodemailer-handlebars')

const sendnotification = async(spende)=>{
    
    try{
        console.log(spende)
        // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: false,
        port: 587,
        auth: {
            user: process.env.EMAIL_SECRET, // generated ethereal user
            pass: process.env.CODEGEAR, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    transporter.use('compile', hbs({
        viewEngine: 'express-handlebars',
        viewPath: '../hbs/'
    }));

    let mailOptions = {
        from: process.env.EMAIL_SECRET, // TODO: email sender
        to: spende.email, // TODO: email receiver
        subject: 'spender information',
        text: 'it works!!',
        html: `<section class="">
                    <div style="display: flex; flex-direction: column; ">
                        <div class="title" style="background-color: rgb(91, 87, 134); color:#fff; padding: 2rem 4rem; margin: 2rem 4rem;"> 
                            hi Denise 
                        </div>
                        <div class="body" style="height: 60vh; padding: 2rem 4rem; margin: 2rem 4rem;">
                            <div style="display: flex; justify-content: flex-start; align-items: center; padding: .5rem 0rem;">
                                <label for="">Name: </label>
                                <span style="padding-left: 2rem;">${spende.firstname} ` + ` ${spende.lastname}  </span>
                            </div>
                            <div style="display: flex; justify-content: flex-start; align-items: center;  padding: .5rem 0rem;">
                                <label for="">Address: </label>
                                <span style="padding-left: 2rem;"> ${spende.address.street} ` + ` ${spende.address.number}</span>
                            </div>
                            <div style="display: flex; justify-content: flex-start; align-items: center;  padding: .5rem 0rem;">
                                <label for="">Code: </label>
                                <span style="padding-left: 2rem;">${spende.address.code}</span>
                            </div>
                            <div style="display: flex; justify-content: flex-start; align-items: center;  padding: .5rem 0rem;">
                                <label for="">Country: </label>
                                <span style="padding-left: 2rem;">${spende.address.country}</span>
                            </div>
                            <div style="display: flex; justify-content: flex-start; align-items: center;  padding: .5rem 0rem;">
                                <label for="">Email: </label>
                                <span style="padding-left: 2rem;">${spende.email}</span>
                            </div>
                            <div style="display: flex; justify-content: flex-start; align-items: center;  padding: .5rem 0rem;">
                                <label for="">Phone: </label>
                                <span style="padding-left: 2rem;">${spende.phone}</span>
                            </div>
                            <div style="display: flex; justify-content: flex-start; align-items: center; padding: .5rem 0rem;">
                                <label for="">Organisation: </label>
                                <span style="padding-left: 2rem;">${spende.organisation} </span>
                            </div>
                            <div style="display: flex; justify-content: flex-start; align-items: center; padding: .5rem 0rem;">
                                <label for="">Amount: </label>
                                <span style="padding-left: 2rem;">${spende.amount} Euros</span>
                            </div>
                            <p> ${spende.message}</p> 
                        </div>
                        <div class="" style="background-color: rgb(91, 87, 134);; color:#fff; padding: 2rem 4rem; margin: 2rem 4rem;"> 
                            thank you
                        </div>
                    </div>
                </section>`,
        /*template: 'mail',
        context: {
            spende: spende,
        }*/ // send extra values to template
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log('Error occurs' + err);
        }
        return console.log('Email sent!!! from ' + spende.email);
    });
 
}
    catch(err){
        console.log(err)
    };
}
module.exports = { sendnotification }