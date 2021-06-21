const mongoose = require('mongoose')

//Database
const URL = process.env.MONGODB
mongoose.connect(URL, {
    useNewUrlParser : true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
}).then(() => console.log('Database connected'))
