const router = require("express").Router();
const userCtr = require('../Controller/UserController.js');
const storeFile = require('../Service/multer') 
const access = require('../Service/authentication') 

//router.post('/addprofileimage', storeFile.storeprofileimage.array('image', 1), userCtr.addprofileimage)
//router.post("/removecomment/:id", userCtr.removecomment)
router.post("/comment", userCtr.comment)
router.post("/addrate", userCtr.rate)
router.get("/getscore", userCtr.getscore)
router.get("/getcomments", userCtr.getcomments)

module.exports = router;