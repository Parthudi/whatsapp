const express = require('express')
const route = new express.Router()
const {signupUser, loginUser, logoutUser, findUserId, read, update, remove, message, userContacts} = require('../controllers/userControllers')
const {autnenticationMessage} = require("../controllers/qrAuthentication");
const {Auth, isAuth, isAdmin } = require('../middleware/auth')

//Routes
route.post('/user/signup' , signupUser)
route.post('/user/login', loginUser)
route.param('userid', findUserId)

route.post('/user/logout/:userid',Auth, isAuth, logoutUser)
route.post("/user/message" ,Auth,  message);

route.patch('/user/update/:userid',Auth, update )
route.delete('/user/delete/:userid',Auth, isAuth, remove )

route.post('/users',Auth, read)
route.get("/users/auth" , Auth, autnenticationMessage)
route.get("/user/contact" ,Auth, userContacts);

// route.get('/secret/:userid',Auth, isAuth,isAdmin, (req, res) => {
//     res.json('done')
// })

module.exports = route