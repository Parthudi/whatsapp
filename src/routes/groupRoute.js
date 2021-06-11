const express = require('express')
const route = new express.Router()
const {signupGroup, readGroup, autnenticationMessage, message} = require('../controllers/groupController')
const {Auth, isAuth, isAdmin } = require('../middleware/auth')

//Routes
route.post('/group/signup' ,Auth, signupGroup)
// route.post('/user/login', loginUser)
// route.param('userid', findUserId)

// route.post('/user/logout/:userid',Auth, isAuth, logoutUser)
route.get('/groups',Auth, readGroup)
// route.get("/users/auth" , Auth, autnenticationMessage)
// route.patch('/user/update/:userid',Auth, isAuth, update )
// route.delete('/user/delete/:userid',Auth, isAuth, remove )
route.get("/group/auth" , Auth, autnenticationMessage)
route.post("/group/message" ,Auth,  message);


module.exports = route