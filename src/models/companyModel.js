const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
       },
    address1: {
        type: String,
        required: true,
          },
    address2: {
        type: String,
         },
    state: {
        type: String,
        required: true,
        },
    city: {
        type: String,
        required: true,
       },
    pincode: {
        type: String,
        required: true,
      },
    gstin: {
        type: String
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

const Company = mongoose.model('company', companySchema)

module.exports = Company