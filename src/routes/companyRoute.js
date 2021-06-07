const express = require('express')
const route = new express.Router()
const {signupCompany, readAllCompanies} = require('../controllers/companyController')
const {Auth, isAuth, isAdmin } = require('../middleware/auth')

//Routes
route.post('/company/signup' , signupCompany)
// route.post('/user/login', loginUser)
// route.param('userid', findUserId)

// route.post('/user/logout/:userid',Auth, isAuth, logoutUser)
route.get('/companies',Auth,isAdmin, readAllCompanies)
// route.get("/users/auth" , Auth, autnenticationMessage)
// route.patch('/user/update/:userid',Auth, isAuth, update )


// route.get('/secret/:userid',Auth, isAuth,isAdmin, (req, res) => {
//     res.json('done')
// })

module.exports = route