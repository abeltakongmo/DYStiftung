const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
const { bool } = require('sharp');



const spendeSchema = new Schema(
    {
        //_id: mongoose.Schema.Types.ObjectId,
        firstname: {
            type: String,
            required: false
        },
        lastname: {
            type: String,
            required: false
        },

        phone: {
            type: String,
            required: false,
            //unique: true
        },
        email: {
            type: String,
            required: true,
            //unique: true
        },
        ip: {
            type: String,
            required: true,
            //unique: true
        },
        organisation: {
            type: String,
            required: false,
            //unique: true
        },
        amount: {
            type: Number,
            required: false,
            //unique: true
        },
        address:  {
            street: {type: String, required: false},
            number: {type: String, required: false},
            code: {type: Number, required: false},
            country: {type: String, required: false},
        },
        message: {
            type: String,
            required: true,
            max: 2000,
        },

    }, { timestamps:true }
);

const Spende = mongoose.model('spende', spendeSchema);
module.exports = Spende; 


