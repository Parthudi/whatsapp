const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const validator = require('validator')

const contactSchema = new mongoose.Schema({
    company: {
        type: ObjectId,                  
        ref: 'company',                 
        required: true
    },
    mobile_number: {
        type: Number,
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