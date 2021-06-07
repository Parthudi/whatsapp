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
        type: String,
        required: true
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

const Group = mongoose.model('group', groupSchema)

module.exports = Group