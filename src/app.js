const express = require('express')
require('./db/database')
const morgon = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const Auth =  require('./middleware/auth')
const cors = require('cors')

//import Routes
const userRouter = require('./routes/usersRoute')
// const categoryRouter = require('./routes/categoryRoutes')
// const productRouter = require('./routes/productRouter')

const app = express()
const port = process.env.PORT || 4000

//middlewares
app.use(morgon('dev'))      //just specifies routes in console like:- ( POST /signup 201 time )
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//Routes
app.use(userRouter)
// app.use(categoryRouter)
// app.use(productRouter)

app.listen(port , () => {
    console.log('server is running on port ' +port)
} )