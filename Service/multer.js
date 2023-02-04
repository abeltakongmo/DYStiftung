const multer = require('multer')
const path = require('path')
//const sharp = require('sharp')

function storagefkt(destination ){
    var storageobj =  multer.diskStorage({
        destination: function(req, file, cb){
            cb( null, destination +`${req.params.id}`)
        },
        filename: function(req, file, cb)
        {
            cb( null, file.fieldname + '-' + Date.now()
            + path.extname(file.originalname))
        }
    })
    return storageobj
}

function storagefktwithoutId(destination ){
    var storageobj =  multer.diskStorage({
        destination: function(req, file, cb){
            cb( null, destination )
        },
        filename: function(req, file, cb)
        {
            cb( null, file.fieldname + '-' + Date.now()
            + path.extname(file.originalname))
        }
    })
    return storageobj
}

function storagevotefktwithoutId(destination ){
    var storageobj =  multer.diskStorage({
        destination: function(req, file, cb){
            cb( null, destination )
        },
        filename: function(req, file, cb)
        {
            cb( null, file.fieldname + '-' + Date.now()
            + path.extname(file.originalname))
        }
    })
    return storageobj
}

function checkFileType(file, cb, filetype, err){
    // allow extension

    const filetypes = filetype 
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimetypes = filetypes.test(file.mimetype)
    if(mimetypes && extname) {
        return cb(null, true);
    } else {
        cb(err)
    }
}

const resizeFileImage = async(file, cb)=>{
    var link =  `public/projects/${req.params.id}/resizeImage`
    fs.access(link, (err)=>{
        if(err){
            fs.mkdirSync(link)
        }
    })
    await sharp(req.file.buffer.resize({width:615, height:350})).toFile(link)
}

/*var storageimage = multer.diskStorage({
    destination: function(req, file, cb){
        cb( null, `public/projects/${req.params.id}`)
    },
    filename: function(req, file, cb)
    {
        cb( null, file.fieldname + '-' + Date.now()
        + path.extname(file.originalname))
    }
})*/

var storageimage = storagefkt('public/projects/')
var storage  = storagefkt('public/projects/')
var storageprofile  = storagefkt('public/users/')
var storagepost = storagefktwithoutId('public/posts/')
var storagevote = storagevotefktwithoutId('public/votes/')

storeimage = multer({
    storage: storageimage,
    limits: {fileSize : 5000000},
    fileFilter: function(req, file, cb){
        //checkFileImage(file, cb);
        checkFileType(file, cb, /jpeg|jpg|png|gif/, 'Error: format of file is not accepted');
    }
})

storefile = multer({
    storage: storage,
    limits: {fileSize : 5000000},
    fileFilter: function(req, file, cb){
        const filetypes = /pdf/
        checkFileType(file, cb, filetypes, 'Error: please add only pdf file');
    }
})

storeprofileimage = multer({
    storage: storageprofile,
    limits: {fileSize : 5000000},
    fileFilter: function(req, file, cb){
        //checkFileImage(file, cb);
        checkFileType(file, cb, /jpeg|jpg|png|gif/, 'Error: format of file is not accepted');
    }
})

storepostimage = multer({
    storage: storagepost,
    limits: {fileSize : 5000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb, /jpeg|jpg|png|gif/, 'Error: format of file is not accepted');
    }
})

storevoteimage = multer({
    storage: storagevote,
    limits: {fileSize : 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb, /jpeg|jpg|png|gif/, 'Error: format of file is not accepted');
    }
})


module.exports = { storefile , storeimage, storeprofileimage, storepostimage, storevoteimage }


