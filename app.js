require('dotenv').config()
const express = require('express');


const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const session = require('express-session')
const app = express();
const bcrypt = require('bcryptjs')
const flush = require('connect-flash')
const flash = require('express-flash')
const access = require('./Service/authentication');
const cors = require('cors')
const passport = require('passport')
const  fs = require('fs-extra')



const mongoose = require('mongoose');
const MongoDBSession = require('connect-mongodb-session')(session)
const User = require('./Model/user');

// route
const APIuserroute = require('./Route/userRoute')
const APIspenderoute = require('./Route/spendeRoute')
// Service
const validation = require('./Service/validation')
const form = require('./Service/validationdto')
const login = require('./Service/loginform')
const signup = require('./Service/signupform');
const initializePassport = require('./Service/passport-config');

// database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then((result)=>app.listen( process.env.PORT || 3002 )) 
.catch((err) => console.log(err));



initializePassport( // initialize
    passport,
    email => User.findOne({$or:[{email:email}]}),
    id => User.findById(id)
)


app.set('view engine', 'ejs');
// middleware
app.use(cors())

//app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}));
app.use(express.static('Public'));
app.use(express.static('hbs'));
app.use('/users', express.static(__dirname +'Public/users'));
app.use('/css', express.static(__dirname +'Public/css'));
app.use('/images', express.static(__dirname +'Public/images'));
app.use('/files', express.static(__dirname +'Public/files'));
app.use('/views', express.static(__dirname +'views/JS'));


const store = new MongoDBSession({
    uri: process.env.DATABASE_URL,
    collection: 'sessions',
})


app.use(session({
    secret: process.env.WEB_COOKIE,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {maxAge: 1000*60*60*24}, // 1 day
}));


app.all('/*', function(req, res, next) {
    if( process.env.UPDATE == 'ON')
    {
        res.render('update',{
            servername: process.env.SERVER_URL,
        });
    }
    else{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    }
});

app.use(flash());
app.use(flush());
app.use(passport.initialize());
app.use(passport.session());
app.use('/API', APIuserroute);
app.use('/API', APIspenderoute);
app.post('/login', form.validationdtologin(login), async function(req, res, next) {
    user = await User.findOne({email:req.body.email})
    .then(async(user) =>{
        console.log(user.email)
        if(!user ){
            req.flash('warning','this user does not exist')
            res.render('login', {
                email: req.body.email,
                message: req.flash('message'),
                warning: req.flash('warning'),
            })
        }
        /*else{
            if( user?.authentification.email != 'done'){
                req.flash('warning','consult your email for your authentification and confirm it before to login')
                res.render('login', {
                    email: req.body.email,
                    message: req.flash('message'),
                    warning: req.flash('warning'),
                })
            }
        }*/
    })
    passport.authenticate('local', function(err, user, info) {
    if (err) {
        return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
    return res.render('login', { 
        success : false, 
        message : req.flash('message'),
        title: 'login',
        warning: 'authentication failed! '+ info.message,
        user: user,
        errors: req.flash().error
    });
    }
    req.login(user, async loginErr => {
        if (loginErr) {
        //return next(loginErr);
            return res.render('login', { 
                success : false, 
                message : 'wrong password',
                title: 'login',
                warning: req.flash('warning'),
                user: user,
                errors: req.flash().error
            });
        }
        else {
            try{
                user.authentification.termsandconditions = 'readedandaccepted'
                user = await User.findByIdAndUpdate(user._id, user, {new:true})
                req.session.loginform.password = ''
                return res.redirect('/admin')
            }
            catch(err){
                console.log(err)
                return res.render('login', { 
                    success : false, 
                    message : err+ ' error in terms and conditions ',
                    title: 'login',
                    warning: req.flash('warning'),
                    user: user,
                    errors: req.flash().error
                });
            }
        }
    });
    })(req, res, next);
});


app.get('/', (req, res)=>{
    res.redirect('/hello');
});

visitor = 0;
app.get('/hello', (req, res)=>{
    visitor = visitor + 1
    res.render('hello', {
        visitor: visitor,
        servername: process.env.SERVER_URL,
    });
});

app.get('/city', (req, res)=>{
    res.render('city');
});

app.get('/login', access.NotAuthenticated, (req, res)=>{
    try{
        if(req.session.loginform){
            user = req.session.loginform
        }
        else{
            var user = {
                email: '' ,
                password: ''
            }
            req.session.loginform = user
        }
        //console.log(req.flash())
        //const errors = req.flash().error || []
        res.render('login', {
        title: 'login',
        message: req.flash('message'),
        warning: req.flash('warning'),
        user: user,
        errors: req.flash().error
        });
    }
    catch(err){
        console.log('error in login')
        console.log(err)
    }
});

app.get('/signup', (req, res)=>{
    res.render('signup',{
        message:'',
        warning:''
    });
});

app.get('/admin', (req, res)=>{
    res.render('admin');
});


app.post('/signup', form.validationdtosignup(signup), async (req, res, next)=>{
    try{
        var email = req.body.email;
        const result = await User.find({ email: req.body.email}).exec()
        .then(async (user) => 
        {
            if(user.length >= 1){
                req.flash('warning', 'this User already exist '+ user[0].email)
                res.redirect('/login')
            }
            else {
                await bcrypt.hash(req.body.password, 10, async function(err, hashedPass) {
                    if(err) {
                        console.log(err)
                        res.json({err : err})
                    }
                    authentification_ = { email:'none', phone:'none'}
                    let _profilimage = [{
                        filename: 'default-image',
                        contenttype: 'jpg',
                        path: '/images/profile.png'
                    }]
                    let user = new User({
                        email: req.body.email,
                        password: hashedPass,
                        role: 'user',// await userrole()
                        profilimages: _profilimage,
                        authentification: authentification_
                    })
                    await user.save(function(err, newuser) {
                        if(err) { 
                            console.log(err)
                            next(err); 
                        }
                        /*
                        var link = `./public/users/${newuser._id}`
                        fs.access(link, (err)=>{
                            if(err){
                                fs.mkdirSync(link)
                            }
                        })
                        */
                    })
                    next();
                })
            }
        })
        .catch(err => console.log(err))
    }
    catch(err){
        console.log('Error in signup '+ err);
        req.flash('message', 'Error in signup ')
        res.render('signup', {
            email: email,
        });
    }
}, (req, res)=> res.redirect('/login'));

app.get("/logout", async (req, res)=>{
    try{
        console.log('logout')
        req.session.isAuth = false
        req.session.destroy((err)=>{
            if(err) {
                console.log(err)
                throw err
            };
        })
        req.logout();
        res.redirect("/hello");
    }
    catch(err){
        console.log('error in logout')
        console.log(err)
    }
});


// 404 Page
app.use((req, res)=>{
    res.render('error');
})