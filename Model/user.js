const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
const { bool } = require('sharp');



const userSchema = new Schema(
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
        address:  {
            street: {type: String, required: false},
            number: {type: String, required: false},
            code: {type: Number, required: false},
            country: {type: String, required: false},
        },
        role: {
            type: String,
            required: false,
            default: 'user',
        },

        authentification:{
            email: {type: String, required: false},
            phone: {type: String, required: false},
            project:{
                number:  { type: Number, default: 1, required: false},
                expiredate:  { type: Date, default: 2, required: false},
                creation: {type: String, default: 'true', required: false}
            },
            post:{
                number:  { type: Number, default: 1,  required: false},
                expiredate: { type: Date, required: false},
                creation: {type: String, default: 'true', required: false}
            },
            location:{
                status: { type: String, required: false},
                latitude: { type: Number, required: false},
                longitude: { type: Number, required: false},
            },
            termsandconditions: {type: String, default: 'readedandaccepted', required: false},
        },

        status: {
            connected:  { type: String, required: false},
            locked: { type: String, required: false},
            date: {type: Date, default: Date.now(), required: false},
        },

        notifications:  [{
            _id:{type: Schema.Types.ObjectId, required: false},
            title: {type: String, required: false},
            content: {type: String, required: false},
            read:{type: Boolean, required: false},
            date:{type: Date, default: Date.now(), required: false},
            from:{type: String, required: false},
            selected:{type: Boolean, required: false},
        }],
        profilimages:[{
            filename: {type: String, required: false},
            contenttype: {type: String, required: false},
            url: {type: String, required: false},
            path: {type: String, required: false},
        }],
        password: {
            type: String,
            required: true,
        },
        request: {
            id: {type: String, required: false},
            email: {type: String, required: false},
        },
        score: {type: Number, required: false},
        rates:[{
            ip: {type: String, default:'no ip', required: false},
            rate: {type: Number, required: false},
        }],
        comments:[{
            ip: {type: String, default:'no ip', required: false},
            name: {type: String, default:'no name', required: false},
            text: {type: String, required: false},
            date: {type: Date, required: false}        
        }],
    }, { timestamps:true }
);

userSchema.plugin(require('mongoose-beautiful-unique-validation'));
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('users', userSchema);
module.exports = User; 


