

class signinform {
    create(req, res){
        console.log('validator created')
    }
}

function validateform(schema){
    return async (req, res, next)=>{
        try{
            const validatebody = await schema.validate(req.body)
            req.body = validatebody
            next()
        }
        catch(err){
            req.flash('warning', err)
        }
    }
}
const signin = (req, res, next)=>{
    try{
        Validator = new signinform()
        Validator.create(req, res)

        const { email, password, confirmpassword } = req.body
        req.check(email, 'Invalid Email input').isEmail()
        req.check(password, 'invalid password').isLenght({min:8}).equals(confirmpassword)
        
        var errors = req.validationErrors()
        if(errors){
            req.session.errors = errors
            res.redirect('/signup')
        }
        else{
            next()
        }
    }
    catch(err){
        console.log(err)
        console.log('error in signvalidation')
    }
}

module.exports = { signin }