function validationdtosignup(schema){
    return async (req, res, next)=>{
        try{
            const validatebody = await schema.validate(req.body)
            req.body = validatebody
            next()
        }
        catch(err){
            
            err.value.password = ''
            err.value.confirmpassword = ''
            req.session.formdata = err.value
            req.flash('warning', err.errors)
            res.render('signup', {
                email: req.body.email,
                message:req.flash('message'),
                warning:req.flash('warning')
            });
        }
    }
}

function validationdtologin(schema){
    return async (req, res, next)=>{
        var user
        try{
            const validatebody = await schema.validate(req.body)
            req.body = validatebody
            req.session.loginform = validatebody
            next()
        }
        catch(err){
            console.log(err)
            err.value.password = ''
            req.session.loginform = err.value
            req.flash('warning', err.errors)
            //res.redirect('/login')
            res.render('login', { 
                success : false, 
                message : req.flash('warning'),
                title: 'login',
                warning: req.flash('warning'),
                
                errors: req.flash().error
            });
        }
    }
}

function validationdtopasswordchange(schema){
    return async (req, res, next)=>{
        try{
            
            const validatebody = await schema.validate(req.body)
            req.body = validatebody
            req.session.loginform.email =  validatebody.email
            req.session.loginform.password = ''
            next()
        }
        catch(err){
            console.log(err)
            err.value.password = ''
            req.session.loginform = err.value
            req.flash('warning', err.errors)
            res.redirect(req.headers.referer)
        }
    }
}
module.exports = { validationdtosignup, validationdtologin, validationdtopasswordchange }