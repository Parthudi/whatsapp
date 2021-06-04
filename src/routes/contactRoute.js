const express = require('express')
const route = new express.Router()
const {signupContact} = require('../controllers/contactController')
const {Auth, isAuth, isAdmin } = require('../middleware/auth')

//Routes
route.post('/contact/signup' , signupContact)
// route.post('/user/login', loginUser)
// route.param('userid', findUserId)

// route.post('/user/logout/:userid',Auth, isAuth, logoutUser)
// route.get('/users',Auth, read)
// route.get("/users/auth" , Auth, autnenticationMessage)
// route.patch('/user/update/:userid',Auth, isAuth, update )
// route.delete('/user/delete/:userid',Auth, isAuth, remove )
// route.post("/user/message" ,Auth,  message);

// route.get('/secret/:userid',Auth, isAuth,isAdmin, (req, res) => {
//     res.json('done')
// })

module.exports = route