
const bcrypt = require('bcryptjs')
const LocalStrategy =  require('passport-local').Strategy;


function initialize(passport, getUserByEmail, GetUserById, error)//js, getUserById)
{
    console.log('start initialize')
    var id;
    const authenticateUser = async function(email, password, done){
        var _id;
        const user =  await getUserByEmail(email)
        if(user == null){
            console.log('user does not exist')
            //error = 'user does not exist'
            return done(null, false, {message: 'this user does not exist!'})
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }
            else{
                //error = 'password incorrect'
                return done(null, false, { message: 'password incorrect' })
            }
        }
        catch(e){
            return done(e);
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done)=> done(null, user.id ))
    passport.deserializeUser((id, done)=>{
        //return done(null, GetUserById(id))
        GetUserById(id)
        .then((user)=>{
            done(null, user);
        })
        .catch(err=> done(err))
    })
}

module.exports =  initialize ;