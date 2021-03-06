const express = require('express')
const route = new express.Router()
const {signupGroup, readGroup, message} = require('../controllers/groupController')
const {autnenticationMessage} = require("../controllers/qrAuthentication");
const {Auth, isAuth, isAdmin } = require('../middleware/auth')

//Routes
route.post('/group/signup' ,Auth, signupGroup)
// route.post('/user/login', loginUser)
// route.param('userid', findUserId)

// route.post('/user/logout/:userid',Auth, isAuth, logoutUser)
route.post('/groups',Auth, readGroup)
// route.get("/users/auth" , Auth, autnenticationMessage)
// route.patch('/user/update/:userid',Auth, isAuth, update )
// route.delete('/user/delete/:userid',Auth, isAuth, remove )
route.get("/group/auth" , Auth, autnenticationMessage)
route.post("/group/message" ,Auth,  message);


module.exports = route