const express = require('express')
const route = new express.Router()
const {signupContact, readContacts, autnenticationMessage, message, excelSheet, getExcelSheet, newExcelSheet} = require('../controllers/contactController')
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
// route.post('/user/login', loginUser)
// route.param('userid', findUserId)

route.get('/contacts',Auth, readContacts);
route.get("/contact/auth" , Auth, autnenticationMessage);
route.post("/download/excel"  , excelSheet);
route.post("/Sheet" , getExcelSheet);
route.post("/newsheet" , newExcelSheet);
// route.post('/user/logout/:userid',Auth, isAuth, logoutUser)
// route.get("/users/auth" , Auth, autnenticationMessage)
// route.patch('/user/update/:userid',Auth, isAuth, update )

module.exports = route