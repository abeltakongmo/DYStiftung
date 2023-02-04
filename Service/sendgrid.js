/*
let client = require('@sendgrid/mail')
require('dotenv').config()

client.setApiKey(process.env.SENDGRID_API_KEY)

const sendResetLink = async(email, name, id, url)=>{
    link = url+'/authentification/changepassword?id='+id+'&email='+email
    client.send({
        to: email,
        from: process.env.EMAIL_SECRET,
        templateId: process.env.SENDGRID_FORGOTPASSWORD,
        dynamicTemplateData: {
            name: name,
            link: link,
        },
    })
    .then(()=> {console.log('email has been send')})
    .catch(err => console.log('error ' + err))
    
}

const sendactivemail = async(email, name, id, url)=>{
    link = url+'/authentification/activateemail?id='+id+'&email='+email
    console.log('sendgrid '+link)
    client.send({
        to: email,
        from: process.env.EMAIL_SECRET,
        templateId: process.env.SENDGRID_EMAILAUTH,
        dynamicTemplateData: {
            name: name,
            link: link,
        },
    })
    .then(()=> {console.log('email has been send')})
    .catch(err => console.log('error ' + err))
}

const sendnotification = async(email, name, title, message)=>{
    client.send({
        to: email,
        from: process.env.EMAIL_SECRET,
        templateId: process.env.SENDGRID_NOTIFICATION,
        dynamicTemplateData: {
            name: name,
            title: title,
            message: message,
        },
    })
    .then(()=> {console.log('email has been send')})
    .catch(err => console.log('error ' + err))
}
module.exports = { sendResetLink, sendactivemail, sendnotification }
*/