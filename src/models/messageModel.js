const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const messageSchema = new mongoose.Schema({
    company: {
        type: ObjectId,                  
        ref: 'company',                 
        required: true
    },
    user: {
        type: ObjectId,
        ref: "userstacks",
        required: true
    },
    contacts: {
        type: [ObjectId],
        ref: "contact"
    },
    group: {
        type: ObjectId,
        ref: "group"
    },
    message: {
        type: String,
        required:true
    },
    createdBy: {
        type: ObjectId,
        ref: "userstasks",
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

const Message = mongoose.model('message', messageSchema)

module.exports = Message