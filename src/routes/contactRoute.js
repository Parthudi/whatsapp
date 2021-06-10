const express = require('express')
const route = new express.Router()
const {signupContact, readContacts, autnenticationMessage, message, excelSheet, mappingExcelSheet, dbUpload} = require('../controllers/contactController')
const {Auth, isAuth, isAdmin } = require('../middleware/auth')
const multer  = require('multer')

const upload = multer({     
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(.xlsx|.csv|png)$/)) {
            return  cb(new Error('file not supported'))
          }  
        cb(undefined, true)
    }
})

//Routes
route.post('/contact/signup' , signupContact);
route.post("/contact/message" ,Auth,  message);
route.post("/download/excel"  ,Auth, excelSheet);
route.post("/upload/data"  ,Auth, dbUpload);
route.post('/contacts',Auth, readContacts);

// route.post('/user/login', loginUser)
// route.param('userid', findUserId)

route.get("/mappingsheet" ,Auth, mappingExcelSheet);
route.get("/contact/auth" , Auth, autnenticationMessage);
// route.post("/Sheet" , getExcelSheet);
route.get("/mappingsheet" ,Auth, mappingExcelSheet);

// route.post('/user/logout/:userid',Auth, isAuth, logoutUser)
// route.get("/users/auth" , Auth, autnenticationMessage)
// route.patch('/user/update/:userid',Auth, isAuth, update )

module.exports = route