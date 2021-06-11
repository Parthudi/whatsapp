const mongoose = require('mongoose')
const validator = require('validator')
const bycrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const {ObjectId} = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 4,
        maxlength: 20
       },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error({error: 'Email Invalid'})
              }
            }
          },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                 throw new Error({error: 'password cannot contain password'})
            }
          }
        },
    createdAt: {
        type: Date, 
        required: true, 
        default: Date.now 
        },
    modifiedAt: {
        type: Date, 
        required: true, 
        default: Date.now 
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
        },
    company: {
        type: ObjectId,                  
        ref: 'company',                 
    },
    tokenze : [{
        token: {
             type: String,
             required: true
          }
       }] ,
    },
    {
        timestamps: true
       })

userSchema.pre('save' , async function(next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bycrypt.hash(user.password, 8)
    }

    next()
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    return userObject
}

userSchema.methods.generateToken = async function(){ 
    const user = this
    const secret = process.env.JWTSECRET
    const token = JWT.sign({_id: user._id.toString()} , secret)

    user.tokenze = user.tokenze.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findUserCredientials = async(email, password) => {
    const user = await User.findOne({email})

    if(!user) {
        throw new Error ('Email Invalid')
     }
    const isMatch = await bycrypt.compare(password, user.password)  //password from postman , db password

    if(!isMatch) {
        throw new Error ('Login Failed')
     }
     return user
}

const User = mongoose.model('usersTask', userSchema)

module.exports = User