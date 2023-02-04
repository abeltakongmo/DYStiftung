/*
const AWS = require("aws-sdk");
require('dotenv').config()

const config = new AWS.Config({
    region: "eu-central-1",
    secretAccessKey: process.env.SECRET,
    accessKeyId: process.env.KEY_ID
});
const ses = new AWS.SES(config);
var sns = new AWS.SNS();

function sendSMS(to_number, message, cb) {

    sns.publish({
        Message: message,
        Subject: 'Admin',
        PhoneNumber:to_number
    }, cb);

  }

  const PhoneNumberArray = ['any mobile number']
  PhoneNumberArray.forEach(number => {
    sendSMS(number, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", (err, result)=>{
        console.log("RESULTS: ",err,result)
      })
  })
const sendResetLink = (email, id) =>{
    const params = {
        Destination: {
            ToAddresses: [
                email,
            ]
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: `To reset your password, please click on this link: http://localhost:3000/reset/${id}`
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Reset password instructions"
            }
        },
        Source: "noreplyinvestleaguedk@gmail.com",
    };

    ses.sendEmail(params, (err) => {
        if (err) {
            console.log(err);
        }
    });
}


module.exports = {sendResetLink, sendSMS};
*/