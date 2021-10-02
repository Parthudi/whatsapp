const express = require('express')
const route = new express.Router()
const {signupCompany, readAllCompanies} = require('../controllers/companyController')
const {Auth, isAuth, isAdmin } = require('../middleware/auth')

//Routes
route.post('/company/signup' , signupCompany)
route.get('/companies',Auth,isAdmin, readAllCompanies)


module.exports = route