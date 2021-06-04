const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const contactSchema = new mongoose.Schema({
    company: {
        type: ObjectId,                  
        ref: 'company',                 
        required: true
    },
    mobile_number: {
        type: String,
        required: true,
          },
    country_code: {
        type: String,
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