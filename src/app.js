const express = require('express')
require('./db/database')
const morgon = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');
// const Auth =  require('./middleware/auth')
const cors = require('cors')

//import Routes
const userRouter = require('./routes/usersRoute')
const companyRouter = require('./routes/companyRoute')
const contactRouter = require('./routes/contactRoute')
const groupRouter = require("./routes/groupRoute")

const app = express()
const port = process.env.PORT || 4000

//middlewares
app.use(morgon('dev'))      //just specifies routes in console like:- ( POST /signup 201 time )
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({limit: "10mb", extended: true}));
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({createParentPath: true}))

//Routes
app.use(userRouter);
app.use(companyRouter);
app.use(contactRouter);
app.use(groupRouter);


app.listen(port , () => {
    console.log('server is running on port ' +port)
} )