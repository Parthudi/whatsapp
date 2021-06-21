const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const validator = require('validator')

const contactSchema = new mongoose.Schema({
    company: {
        type: ObjectId,                  
        ref: 'company',                 
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    mobile_number: {
        type: Number,
        unique: true,
        required: true,
          },
    country_code: {
        type: String,
        required: true,
        default: +91
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
    createdBy: {
        type: ObjectId,
        ref : "userstasks",
        required: true,   
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
    } },
    {
        timestamps: true
       })

const Contact = mongoose.model('contact', contactSchema)

module.exports = Contact