const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const validator = require('validator')

const contactSchema = new mongoose.Schema({
    company: {
        type: ObjectId,                  
        ref: 'company',                 
        required: true
    },
    user: {
        type: ObjectId,
        ref: "users",
        required: true
    },
    contacts: {
        type: [ObjectId],
        ref: "contacts"
    },
    group: {
        type: ObjectId,
        ref: "groups"
    },
    message: {
        type: String,
        required:true
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