const router = require("express").Router();
const storeFile = require('../Service/multer') 
const nodemailer = require('../Service/nodemailer') 
const Spende = require('../Model/spende') 


router.post("/spende", async(req, res, next)=>{
    try{
        var _address = {
            street: req.body.street,
            number: req.body.number,
            city: req.body.city,
            code: req.body.code,
            country: req.body.country,
        }
        var _spende =  {
            ip: req.sessionID,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            organisation: req.body.oranisation,
            amount: req.body.amount,
            address: _address,
            message: req.body.message,
        }
        
        let spendes = await Spende.find({})
        var spende = spendes.find(rt => rt.ip.toString() === req.sessionID.toString() )
        if(spende) {
            const option = { new:true };
            const nspende = await Spende.findByIdAndUpdate(spende._id, _spende, option)
        }
        else{
            spende = new Spende(_spende)
            await spende.save(function(err, newspende) {
                if(err) {
                    console.log(err)
                    next(err); 
                }
            })
        }
        res.status(200).json({ success: 1, message: 'spender information has been sent!', spendeid: spende._id})
    }
    catch(err){
    res.status(500).json({message: err+ ' error in spende API'})
    console.log(err+ ' error in rate API')
    }
})


router.post("/emailnotify/:id", async(req, res, next)=>{
    try{
        spende = await Spende.findById(req.params.id)
        console.log('spende')
        console.log(spende)
        if(!spende){
            res.status(200).json({ success: 0, message: 'spender information does not exist!'})
        }
        else{
            nodemailer.sendnotification(spende)
            res.status(200).json({ success: 1, message: 'spender information has been sent by email!'})
        }
    }
    catch(err){
    res.status(500).json({message: err+ ' error in emailnotify API'})
    console.log(err+ ' error in rate API')
    }
})

module.exports = router;