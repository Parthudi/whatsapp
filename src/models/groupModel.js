const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const groupSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'usersTask',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contacts: {
        type: [ObjectId],
        ref: "contact",
        required: true
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
    modifiedBy: {
        type: ObjectId,
        ref: "userstacks"
    },
    modifiedAt: {
        type: Date, 
        required: true, 
        default: Date.now 
    } },
    {
        timestamps: true
       })

const Group = mongoose.model('group', groupSchema)

module.exports = Group