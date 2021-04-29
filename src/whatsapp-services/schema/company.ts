import mongoose from "mongoose";
import { StringifyOptions } from "node:querystring";

interface Company {
    name: String;
    address_1: String;
    address_2:String;
    state: String;
    city: String;
    pincode: Number;
    gstin: Number;
    created_at: Date;
    modified_at: Date;
  }

const Schema = mongoose.Schema;

const companySchema = new Schema({
    name : {type: String},
    address_1 : {type: String},
    address_2 : {type : String},
    state : {type: String},
    city: {type:String},
    pincode: {type:Number},
    gstin: {type: Number},
    created_at: { type: Date, default: Date() },
    modified_at: { type: Date, default: Date() },
});

export interface ICompanySchema extends Company, mongoose.Document { }
export default mongoose.model<ICompanySchema>("company", companySchema);